# ------------------------------------------------------------------------------
# VCS Info: $Id$
# This script will sync local data folder with FTP/SFTP server.
# It will download only if the file was not downloaded before otherwise
# skips it. It also makes an entry into database table to indicate the
# Usage:
#
# ------------------------------------------------------------------------------

import argparse

import lib_dbutils as db
import lib_ftp_utils as ftp
import lib_ldenv as env
import lib_misc_utils as misc
from db_schema_magento import TblFileStatus
from sqlalchemy import func

log = misc.get_formatted_logger(name=__name__)
env.AppCfg.register('lhs_env')                  # Get this from an environment variable.


def parse_args(cfg):
    """
    Parse command line arguments.
    """
    parser = argparse.ArgumentParser(description='Synchronize files in local environment against remote server.')
    parser.add_argument('-tag_name', '--tag_name', default=None, required=True,
                        choices=cfg.VALID_TAGS,
                        help='One or more tag name. Restricted as every client requires configuration in load tables.')
    parser.add_argument('-updates_since', '--updates_since', default='',
                        help='Updates since from the last timestamp, if blank it will try to read the last time stamp \
                        from DB table. If not passed it will attempt to download everything.')
    parser.add_argument('-overwrite', '--overwrite_files', default=False, action='store_true',
                        help='Overwrites local files from remote server.')
    args = parser.parse_args()
    log.info(args)

    return args


def pull_files(args, cfg, max_file_count=50):
    log.info('Running pull_files')
    ftp_cfg = cfg.SHOP_FTP_SERVER
    ftp_cfg.LOCAL_DIR = ftp_cfg.LOCAL_DIR.format(tag_name=args.tag_name)
    ftp_cfg.REMOTE_DIR = ftp_cfg.REMOTE_DIR.format(tag_name=args.tag_name)
    session = db.database_factory().session
    files_loaded = session.query(TblFileStatus.file_name).filter(TblFileStatus.tag_name == args.tag_name).all()
    #FIXME: Ugly hack find elegant way of doing this.
    files_loaded = list(zip(*files_loaded))
    if files_loaded:
        files_loaded = files_loaded[0]

    with ftp.FTP(ftp_cfg) as ftp_obj:
        def functor(x):
            return x.filename not in files_loaded
        files = ftp_obj.find_files(functor,
                                   filename=ftp_cfg.SOURCE_FILE_NAME)
        files = files[:max_file_count]
        ftp_obj.get(files)

    log.info('Downloaded {} files'.format(len(files)))
    return files


def update_file_status_in_db(args, files):
    log.info('Running update_file_status_in_db')
    session = db.database_factory().session
    try:
        for chunk in range(0, len(files), 1000):
            session.add_all([TblFileStatus(tag_name=args.tag_name,
                                           file_name=file_name,
                                           status='New',
                                           error_text='',
                                           created_ts=func.now())
                             for file_name in files[chunk:chunk+1000]])
            session.flush()

        session.commit()
        log.info('Updated {} files with ''New'' status'.format(len(files)))
    except Exception as e:
        session.rollback()
    finally:
        session.close()


def sync_etl_files(args):
    """
    Main wrapper method does the following:
    1. Download files only if not uploaded before.
    2. Update status of file in table.
    """
    log.info('Running sync_etl_files')
    cfg = env.get_config_object()
    files = 1
    file_count = 0
    while files:
        files = pull_files(args, cfg)
        update_file_status_in_db(args, files)
        file_count += len(files)

    log.info('Total download file count: {}'.format(file_count))

if __name__ == "__main__":
    try:
        cfg = env.get_config_object()
        args = parse_args(cfg)
        sync_etl_files(args)
    except Exception as e:
        log.info('Exception thrown:\n{}'.format(e))
        raise
