"""
DB related utility functions are added here.
"""
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import default_comparator  # @UnusedImport
from sqlalchemy.sql import table, column, select, literal_column, and_
from collections import defaultdict

import lib_ldenv as env
import lib_memoize_decorator_pattern as decorator
from lib_misc_utils import get_formatted_logger

log = get_formatted_logger(name=__name__)
env.AppCfg.register('lhs_env')


class Database(object):
    def __init__(self, db_url, **kwargs):
        # TODO: Decrypt password here.
        log.info('DB URL={}'.format(db_url))
        self.db_url = db_url
        self.echo = kwargs.get('echo', False)
        self.isolation_level = kwargs.get('isolation_level', 'READ_UNCOMMITTED')

    @property
    def engine(self):
        engine = create_engine(self.db_url, isolation_level=self.isolation_level, echo=self.echo)
        return engine

    @property
    def session(self):
        session = sessionmaker(bind=self.engine)
        return session()

    def exec_sproc(self, sproc_name, *sp_args):
        """
        Execute the store procedure and return the results.
        :param sproc_name: stored procedure name.
        :param sp_args: list of arguments to stored procedure.
        :return: returns sql cursor rows in list.
        """
        connection = None
        try:
            connection = self.engine.raw_connection()
            cursor = connection.cursor()
            cursor.execute(sproc_name, sp_args)
            results = list(cursor.fetchall())
            cursor.close()
            connection.commit()
        except:
            log.info(f'Failed to run {sproc_name} {sp_args}')
            raise
        finally:
            connection.close()

        return results

    def run_sql(self, sql_cmd, args=None, **kwargs):
        """
        Runs raw SQL
        :param sql_cmd: Provide SQL Statement
        :return: cursor result set.
        """
        args = () if args is None else args
        conn = self.engine.connect()
        return conn.execute(sql_cmd, args)


    @staticmethod
    def sql_rows_to_dict(sa_rows, keys):
        """
        Accepts SQL Alchemy result set and returns a map of keys to rows.
        :param sa_rows: sql result set
        :param keys: mapping keys
        :return: dictionary
        """
        ret_dict = defaultdict(list)
        for obj_row in sa_rows:
            d = obj_row._asdict()
            key = ':'.join([str(d[k]) for k in keys])
            ret_dict[key].append(d)

        return ret_dict


@decorator.memoized
def database_factory(**kwargs):
    """
    A helper wrapper function to return database session object.
    It returns cached session. As a best practice one session is sufficient to work with typically.
    :rtype: object
    :param kwargs:
    :return:
    """
    db_cfg = env.get_config_object()
    db_cfg = db_cfg.DATABASE

    db_url = kwargs.get('CONN_URL', db_cfg.CONN_URL)
    db = Database(db_url, **kwargs)

    return db


class SqlAlchemySchemaGenerator:
    """
    A helper class to generate schema text. Currently implemented for table schema it can be extended
    for other purposes, if required.
    """

    def __init__(self, for_files=None, **kwargs):
        self.kwargs = kwargs
        if for_files is None:
            self.files = []
        else:
            self.files = for_files

    def __str__(self):
        return self.get_user_defined_table_class()

    @property
    def database(self):
        return database_factory(**self.kwargs)

    def files_map(self):
        """Query DB to get the list of files and their associated table name mappings."""
        query_text = select(['src_attr', 'tgt_attr']) \
            .select_from('prg.src_tgt_obj_attr') \
            .where(and_(literal_column("tgt_obj = 'load_tables_from_files'"),
                        literal_column("src_type = 'R'"),
                        (literal_column('src_attr').in_(self.files) if self.files else True)))
        rows = self.database.run_sql(query_text).fetchall()
        return {r.src_attr: r.tgt_attr for r in rows}

    def get_user_defined_table_class(self):
        schema_text = ''
        for file, table in self.files_map().items():  # @UnusedImport
            schema_text += str(self.Table(table, **self.kwargs))

        return schema_text

    class Table:
        """
        It is a very custom class to drive the source to target mappings defined on backend table.
        The table, column, data type, length etc. of a specified table are read from get_src_tgt_config
        stored procedure. Python class generated here is used by file loaders for processing files
        received on FTP.
        """
        level = 0
        indent = "  "
        column_list = None

        def __init__(self, table_name, **kwargs):
            self.table_name = table_name
            self.kwargs = kwargs

            if 'database' in kwargs:
                self.database = kwargs['database']
            else:
                self.database = database_factory(**self.kwargs)

        def __str__(self):
            return self.schema() + self.columns() + self.validate_data() + '\n'

        def schema(self):
            """Return header part of model class."""
            schema_lines = []
            schema_lines.append(f"class {self.table_name.title()}(Base):")
            self.level += 1
            schema_lines.append(f'{self.indent*self.level}__table_name__ = "{self.table_name}" ')
            return '\n'.join(schema_lines) + '\n'

        def columns(self):
            """Return column descriptors of the table."""
            column_text = []
            for col in self.get_column_list():
                column_text.append(f"{self.get_column_member(col)}")

            return '\n'.join(column_text) + '\n'

        def get_column_member(self, obj):
            """Returns class column member"""
            data_type = {
                'int': 'Integer',
                'varchar': 'String',
                'tinyint': 'Boolean',
                'decimal': 'Numeric',
                'datetime': 'DateTime',
                'smallint': 'SmallInteger',
            }
            col_type = f'{obj.col_datatype}'.replace(obj.col_type, data_type[obj.col_type])
            return f"{self.indent*self.level}{obj.col_name} = Column({col_type})"

        def get_column_list(self):
            """Returns list of columns in this table."""
            if self.column_list:
                return self.column_list

            sql_stmt = select(['col_name', 'col_type', 'col_len', 'col_datatype', ]) \
                .select_from('v_doc_tbl_cols') \
                .where(and_(literal_column('tbl_name') == self.table_name,
                            literal_column('owner') == 'dbo'))
            self.column_list = self.database.run_sql(sql_stmt).fetchall()
            return self.column_list

        def validate_data(self):
            """Generate validate data method. This will be used to truncate data that exceeds length."""
            varchar_list = []
            for col in self.get_column_list():
                varchar_list.append(col.col_name)
            validate_str_list = ', '.join([f"'{c}'" for c in varchar_list])
            validate_str_array = [
                '\n',
                f'@validates({validate_str_list})',
                'def truncate_data(self, key, value):',
                '    max_len = getattr(self.__class__, key).prop.columns[0].type.length',
                '    if value and len(value) > max_len:',
                '        return value[:max_len]',
                '    return value',
                '\n']
            return f"\n{self.indent*self.level}".join(validate_str_array)

        @decorator.memoized
        def get_table_col_mapper(self, filters):
            from sqlalchemy import text

            param1 = f"'tgt_attr=''{filters['tgt_obj']}'''"
            param2 = "'tgt_obj=''map_file_tbl_cols'' AND src_type=''L'''"
            sql_stmt = text(f"dbo.get_src_tgt_cfg @from_wc = :param1, @where_wc = :param2") \
                .bind_params(param1=param1, param2=param2)
            col_maps = self.database.exec_sproc(sql_stmt)

            return {item.src_attr: item.tgt_attr for item in col_maps}


if __name__ == '__main__':
    database = database_factory(CONN_URL='mssql+pyodbc://lhs_dbuser:lhs_dbuser@FNL_Cloud_DSN')
    session = database.session
    print('session=', session)
    engine = session.get_bind()
    print('engine=', engine)
    print('session.connection=', session.connection(execution_options={'ansi_warnings': 'OFF'}))
    print('DB connection=', engine.connect())

    session = database_factory().session
    print('session=', session)
    engine = session.get_bind()
    print('engine=', engine)
    print('DB connection=', engine.connect())
