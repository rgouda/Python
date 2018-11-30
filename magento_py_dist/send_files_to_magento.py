import argparse
import os
import sys

import lib_dbutils as db
import lib_file_utils as fl
import lib_ftp_utils as ftp
import lib_ldenv as env
import lib_mail as ml
import lib_misc_utils as misc
from sqlalchemy import MetaData, Table

log = misc.get_formatted_logger(name=__name__)
env.AppCfg.register('lhs_env')

class Main:
    def __init__(self, parse_args, main):
        self.parse_args = parse_args
        self.main = main

    @property
    def args(self):
        if not self._args:
            self._args = self.parse_args()

        return self._args

    def run(self):
        try:
            self.main()
        except Exception as e:
            message = str(e)
            log.info("Failed with message: {message}")
            self.send_mail(message)

    def send_mail(self, message):
        #TODO: Implement sending mail.
        recipients = 'support@finalyzed.com'
        message = f'Failed with the message: {message}'
        subject = 'Failure notification at client: LHS'
        ml.send_mail(recipients, subject, message)

def parse_args():
    parser = argparse.ArgumentParser(description='Script to send files to Magento')
    parser.add_argument('-ftp_site', '--ftp_site', default='SHOP_FTP_SERVER',
                        help='Provide FTP site for which the FTP details and the objects are defined.')
    parser.add_argument('-table_name', '--table_name', default='v_out_lhs_inventory_all',
                        help='Table/View name to extract from database server.')
    parser.add_argument('-out_filename', '--out_filename', default=None,
                        help='Output filename. It will be generated in direct')
    parser.add_argument('-file_delimiter', '--file_delimiter', default=',',
                        help='Output file delimiter.')
    args = parser.parse_args()
    if not args.out_filename:
        args.out_filename = f'{args.table_name}.txt'
    log.info(args)
    return args


def main():
    args = parse_args()
    # Dump query results to a file.
    cfg = env.get_config_object()
    metadata = MetaData()
    database = db.database_factory(CONN_URL=cfg.DATABASE.CONN_URL, echo=False, autocommit=False)
    session = database.session
    db_engine = session.get_bind()
    output_table = Table(args.table_name, metadata, autoload_with=db_engine)
    q = session.query(output_table)
    column_headers = [col['name'] for col in q.column_descriptions]
    results = q.all()

    # FTP file
    filename = os.path.join(cfg.MAGENTO_OUT_DIR, args.out_filename)
    log.info(f'Preparing output file {filename}')
    fl.write_rows_to_csv_file(results, file_name=filename, col_header=column_headers, sep=args.file_delimiter)
    files = [filename]

    ftp_cfg = cfg[args.ftp_site]
    ftp_cfg.REMOTE_DIR = ftp_cfg.REMOTE_DIR.format(tag_name='')
    with ftp.FTP(ftp_cfg) as ftp_obj:
        ftp_obj.put(files)


if __name__ == "__main__":
    Main(parse_args, main).run()