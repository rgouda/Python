# ------------------------------------------------------------------------------
# VCS Info: $Id$
# Script to upload magento orders and positions into database table. List of
# files to be uploaded are read from database table ftp_file_status (with
# status='NEW'). The table is updated to status='LOADED' after the file is
# successfully loaded.
#
# ------------------------------------------------------------------------------
import argparse
import csv
import os
import re

import lib_dbutils as db
import lib_file_utils as fl
import lib_ldenv as env
import lib_misc_utils as misc
import lib_memoize_decorator_pattern as decorator
from db_schema_magento import TblFileStatus, TblMagentoHeads, TblMagentoPosns
from sqlalchemy import and_, func, Table
from sqlalchemy import MetaData

log = misc.get_formatted_logger(name=__name__)
env.AppCfg.register('lhs_env')


def parse_args(cfg):
    """
        Parse command line arguments.
    """
    parser = argparse.ArgumentParser(description='Load Magento Order files into DB table.')
    parser.add_argument('-tag_name', '--tag_name', default=None, required=True,
                        choices=cfg.VALID_TAGS,
                        help='One or more tag name. Restricted as every client requires configuration in load tables.')
    parser.add_argument('-load_type', '--load_type', default='New', choices=['New', 'Failed'],
                        help='An option to upload new files or those failed to load before')
    args = parser.parse_args()
    log.info(args)

    return args


def load_order(table, file_name, sep='|'):
    log.info('Running load_order')
    log.info('Loading file {}'.format(file_name))
    if not fl.is_file_empty(file_name):
        log.info('..skipping empty file')
        return

    csv.register_dialect('pipes', delimiter=sep, quoting=csv.QUOTE_ALL)
    # Read csv file
    tgt_obj = table.__dict__.get('__tablename__', table.__dict__.get('name'))
    col_map = get_table_col_mapper_v2({'tgt_obj': tgt_obj})
    database = db.database_factory()
    session = database.session
    try:
        with open(file_name) as f:
            f_csv = csv.DictReader(f, dialect='pipes', encoding='iso-8859-1')
            # Convert column names to lower case. It can be done elegantly by deriving from csv.DictReader
            f_csv.fieldnames = [col_map.get(col_name, col_name.lower()) for col_name in f_csv.fieldnames]
            for row in f_csv:
                # Massage data to dictionary
                # row['column_name'] = ''

                # Construct row
                order = table(**row)
                # add to session
                session.add(order)

            # Commit to database
            session.flush()
            session.commit()
    except Exception as e:
        session.rollback()
        log.info('Exception thrown: {}'.format(e))
        raise e


def load_magento_orders(args):
    """This version leverages table definitions defined in db_schema_magento."""
    log.info('Running load_magento_orders')
    cfg = env.get_config_object()

    database = db.database_factory(autocommit=True)
    session = database.session

    # Get list of file names from the table
    file_loader_types = [
        ('%heads%', TblMagentoHeads, load_order),
        ('%positions%', TblMagentoPosns, load_order)
    ]

    for file_type, table, loader in file_loader_types:
        log.info('-'*100)
        log.info('Processing file_type:{}, table:{}, loader:{}'.
                 format(file_type, table, loader))
        files_to_load = session.query(TblFileStatus).\
            filter(and_(TblFileStatus.status == args.load_type,
                        TblFileStatus.tag_name == args.tag_name,
                        TblFileStatus.file_name.like(file_type))).\
            all()
        for f in files_to_load:
            linking_key = ''
            try:
                file_name = os.path.join(cfg.MAGENTO_IN_DIR, re.sub('^/', '', f.file_name))
                linking_key = re.sub('[^\d]', '', os.path.basename(file_name))
                loader(table, file_name)
                f.status, f.updated_ts, f.linking_key = 'Loaded', func.now(), linking_key
            except Exception as e:
                f.status, f.updated_ts, f.error_text = 'Failed', func.now(), str(e)[:250]
                f.linking_key = linking_key
                log.info('...failed with exception {}'.format(str(e)))
                #TODO: Implement to return error status when exceptions.

            session.flush()
            session.commit()

        session.close()

def load_magento_orders_v2(args):
    """In this version we are going to dynamically load table columns using sqlalchemy's autoload feature.
    Table name will be supplied through config."""
    log.info('Running load_magento_orders')
    cfg = env.get_config_object()

    database = db.database_factory(autocommit=True)
    session = database.session
    db_engine = database.engine
    metadata = MetaData()

    table_magento_heads = Table('magento_heads', metadata, autoload_with=db_engine)
    table_magento_positions = Table('magento_positions', metadata, autoload_with=db_engine)

    # Get list of file names from the table
    file_loader_types = [
        ('%heads%', table_magento_heads, load_order),
        ('%positions%', table_magento_positions, load_order)
    ]

    for file_type, table, loader in file_loader_types:
        log.info('-'*100)
        log.info('Processing file_type:{}, table:{}, loader:{}'.
                 format(file_type, table, loader))
        files_to_load = session.query(TblFileStatus).\
            filter(and_(TblFileStatus.status == args.load_type,
                        TblFileStatus.tag_name == args.tag_name,
                        TblFileStatus.file_name.like(file_type))).\
            all()
        for f in files_to_load:
            linking_key = ''
            try:
                file_name = os.path.join(cfg.MAGENTO_IN_DIR, re.sub('^/', '', f.file_name))
                linking_key = re.sub('[^\d]', '', os.path.basename(file_name))
                loader(table, file_name)
                f.status, f.updated_ts, f.linking_key = 'Loaded', func.now(), linking_key
            except Exception as e:
                f.status, f.updated_ts, f.error_text = 'Failed', func.now(), str(e)[:250]
                f.linking_key = linking_key
                log.info('...failed with exception {}'.format(str(e)))
                #TODO: Implement to return error status when exceptions.

            session.flush()
            session.commit()

        session.close()

@decorator.memoized
def get_table_col_mapper_v2(filters):
    from sqlalchemy import text

    database = db.database_factory()
    param1 = f"'tgt_attr=''{filters['tgt_obj']}'''"
    param2 = "'tgt_obj=''map_file_tbl_cols'' AND src_type=''L'''"
    sql_cmd = text(f"dbo.get_src_tgt_cfg @from_wc = {param1}, @where_wc = {param2}")
    col_maps = database.exec_sproc(str(sql_cmd))

    return {item.src_attr: item.tgt_attr for item in col_maps}


# Can be moved into a library file later.
def get_table_col_mapper(filters):
    from sqlalchemy.orm import Mapper, relationship
    from sqlalchemy import MetaData, Column, ForeignKey, Integer

    class Purpose(object):
        def __init__(self, purpose_str):
            self.purpose = purpose_str

    class ColMaps(object):
        def __init__(self, purpose_str):
            self.purpose = purpose_str

    database = db.database_factory()
    session = database.session
    db_engine = session.get_bind()
    meta = MetaData()
    purpose_tbl = Table('mapping_purposes', meta, Column('id', Integer, primary_key=True),
                        autoload_with=db_engine)
    col_map_tbl = Table('src_tgt_obj_attr', meta, Column('id', Integer, primary_key=True),
                        Column('purpose_id', Integer, ForeignKey('mapping_purposes.id')),
                        schema='prg', autoload_with=db_engine)
    Mapper(Purpose, purpose_tbl, properties={'maps': relationship(ColMaps, lazy='dynamic')})
    Mapper(ColMaps, col_map_tbl)

    col_maps = session.query(ColMaps).filter_by(**filters).all()
    return {item.src_attr : item.tgt_attr for item in col_maps}


if __name__ == "__main__":
    try:
        cfg = env.get_config_object()
        args = parse_args(cfg)
        load_magento_orders(args)
    except Exception as e:
        log.info('Exception thrown:\n{}'.format(e))
        raise
