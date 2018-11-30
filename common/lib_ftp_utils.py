"""
    SVN Info: $Id$
    Library for FTP related functions.
"""
import base64
import ftplib
import logging
import os
import paramiko
import re
from collections import namedtuple
import lib_misc_utils as misc
import lib_file_utils as fl

__version__ = "$Revision$"

log = misc.get_formatted_logger(name=__name__)
log = logging.getLogger(__name__)
log.setLevel(level=logging.INFO)


class FTP(object):
    def __init__(self, cfg):
        self.cfg = cfg
        if 'SSH_KNOWN_HOSTS' in cfg:
            self.is_sftp = True
            self.ftp = self._get_sftp_session()
        else:
            self.is_sftp = False
            self.ftp = ftplib.FTP(cfg.HOST, cfg.USERID, base64.b64decode(cfg.PASSWD).decode('utf-8'))


    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
            self._close()

    def _close(self):
        if not self.ftp:
            return

        if self.is_sftp:
            self.ftp.close()
        else:
            self.ftp.quit()

    def _get_sftp_session(self):
        """Function returns SFTP session object. """
        log.info('Running _get_sftp_session')
        host_key = self._get_ssh_host_key(self.cfg.HOST, self.cfg.SSH_KNOWN_HOSTS)
        t = paramiko.Transport((self.cfg.HOST, self.cfg.PORT))
        if not self.cfg.PASSWD:
            pkey = paramiko.RSAKey.from_private_key_file(self.cfg.PKEY_FILE)
            t.connect(username=self.cfg.USERID, pkey=pkey, hostkey=host_key)
        else:
            t.connect(username=self.cfg.USERID, password=base64.b64decode(self.cfg.PASSWD), hostkey=host_key)

        sftp = paramiko.SFTPClient.from_transport(t)

        return sftp

    def _get_ssh_host_key(self):
        """ get host key, if we know one"""
        log.info("Running _get_ssh_host_key")
        hostname, known_hosts = self.cfg.HOST, self.cfg.SSH_KNOWN_HOSTS
        host_key = None
        try:
            host_keys = paramiko.util.load_host_keys(os.path.expanduser(known_hosts))
        except IOError:
            try:
                # try ~/ssh/ too, because windows can't have a folder named ~/.ssh/
                host_keys = paramiko.util.load_host_keys(os.path.expanduser('~/ssh/known_hosts'))
            except IOError:
                raise Exception('*** Unable to open host keys file')

        if host_keys.has_key(hostname):
            host_key_type = host_keys[hostname].keys()[0]
            host_key = host_keys[hostname][host_key_type]
            log.info('Using host key of type %s' % host_key_type)

        return host_key

    def list_files(self, filename='.'):
        log.info('Running list_files')
        if self.is_sftp:
            return self.ftp.listdir_attr(filename)
        else:
            File = namedtuple('File', ['filename'])

            return (File(fname) for fname in  self.ftp.nlst(filename) if fname not in['.', '..'])

    def find_files(self, functor, filename='.'):
        """Find files on SFTP server that return true on the functor provided.
        An optional filename to search for in a file name.

        On FTP server the test can only be on filename string.

        On SFTP server lambda can use one of the file attribute to test.
            st_size (for file size),
            st_mtime (for modified time stamp)
            st_uid (for user id)
        A lambda example: lambda x: x.st_mtime > time.mktime(time.strptime('20150220', '%Y%m%d') """
        log.info('Running find_files')
        lookup_files = filename
        if isinstance(filename, str):
            lookup_files = [filename]
        cfg = self.cfg
        cfg.REMOTE_DIR = cfg.get('REMOTE_DIR', '.')

        files = [f.filename
                 for filename in lookup_files
                 for f in self.list_files(str(os.path.join(cfg.REMOTE_DIR, filename)).replace('\\', '/'))
                 if functor(f)]

        return files

    def get(self, files=None):
        if not files:
            return []

        if self.is_sftp:
            return self.sftp_get(files)
        else:
            return self.ftp_get(files)

    def ftp_get(self, files):
        """Retrieves on a list of files. File names can have wild cards but no variable substituition"""
        log.info('Running ftp_get')
        received_files = []
        self.ftp.set_pasv(self.cfg.PASSIVE)
        self.cfg.REMOTE_DIR and self.ftp.cwd(self.cfg.REMOTE_DIR)

        # Expand wild card filenames.
        if any([re.search('(\*|\?)', file) for file in files]):
            # Check and gather files that are present.
            files_avail = []
            list(map(lambda x: self.ftp.retrlines('NLST {}'.format(x), files_avail.append(x)), files))
            if any('No such file or directory' in f for f in files_avail) or not files_avail:
                raise Exception('File {} not found on FTP site: {}'.format(','.join(files), self.cfg.HOST))
            if len(files_avail) > 2000:
                log.info('Found {} files. Too many files to retrieve, there is a 100 limit.'.format(len(files_avail)))
                raise Exception('Too many files to retrieve, there is a 2000 cap.')
        else:
            files_avail = files

        for file in files_avail:
            log.info('..pulling file {}'.format(file))

            local_file = os.path.join(self.cfg.LOCAL_DIR, os.path.basename(file))
            local_file.replace('\\', '/')
            self.ftp.retrbinary('RETR ' + file, open(local_file, 'wb').write)
            received_files.append(local_file)

        return received_files

    def sftp_get(self, files):
        #TODO: To be implemented
        received_files = []
        return received_files


    def put(self, files=None):
        if not files:
            return []

        if self.is_sftp:
            return self.sftp_put(files)
        else:
            return self.ftp_put(files)

    def ftp_put(self, files):
        log.info('Running ftp_put')
        files_sent = []
        self.ftp.set_pasv(self.cfg.PASSIVE)
        self.cfg.REMOTE_DIR  and self.ftp.cwd(self.cfg.REMOTE_DIR)

        if any([re.search('(\*|\?)', file) for file in files]):
            files_to_send = []
            for a_file in files:
                try:
                    files_to_send.extend(fl.get_all_files(os.path.join(self.cfg.LOCAL_DIR, a_file)))
                except:
                    files_to_send.extend(fl.get_all_files(a_file))
            files = list(files_to_send)

        for a_file in files:
            log.info(f'Sending file {a_file}')
            self.ftp.storbinary('STOR ' + os.path.basename(a_file), open(a_file, 'rb'))
            files_sent.append(a_file)

        return files_sent

    def sftp_put(self, files):
        sent_files = []
        #TODO: Implement SFTP
        return sent_files

'''
import sys
import tempfile
import os
import time

import lib_date_utils as dt
import lib_file_utils as fl
import lib_ldenv as env

def ftp_get(cfg, cob_date=None):
    """Pulls the list of files as specified in SOURCE_FILE_NAME from remote FTP site.
      Supports wild cards in file name"""
    log.info("Running ftp_get")
    
    if cob_date is None:
        cob_date = dt.get_current_cob()
    
    ftp = ftplib.FTP(cfg.HOST, cfg.USERID, base64.b64decode(cfg.PASSWD), timeout=240)    
    ftp.set_pasv(cfg.PASSIVE)
   
    if cfg.get('REMOTE_DIR', ''):
        ftp.cwd(cfg.REMOTE_DIR)
    
    ftped_list = []
    missing_files = []
    for i, file_name in enumerate(cfg.SOURCE_FILE_NAME):
        try:
            file_name = fl.expand_file_name(file_name, cob_date)
            files_list = []
            # Get the list of files from remote site.
            ftp.retrlines('NLST ' + file_name, lambda x: files_list.append(x))
            if any('No such file or directory' in f for f in files_list) or not files_list:
                raise Exception('File %s not found on FTP site: %s'%(file_name, cfg.HOST))
            if len(files_list) > 100:
                log.info('Found %d files. Too many files to retrieve, there is a 100 limit.'%(len(files_list)))
                raise Exception('Too many files to retrieve, there is a 100 limit.')
        
            for file in files_list:
                log.info("Pulling file: " + file)
                
                local_file = "%s/%s" % (cfg.LOCAL_DIR, file)
                if cfg.get('TARGET_FILE_NAME', []):
                    local_file = "%s/%s" % (cfg.LOCAL_DIR, cfg.TARGET_FILE_NAME[i])
                    local_file = fl.expand_file_name(local_file, cob_date)
                    
                ftp.retrbinary('RETR ' + file, open(local_file, 'wb').write)
                ftped_list.append(local_file)
        except:
            # log the missing file and note down there is an exception and 
            # throw at the end after attempting on all files.
            missing_files.append(file_name)
            
    ftp.quit()
    if missing_files:
        msg = 'Files not found on remote server: %s'%(', '.join(missing_files))
        log.info(msg)
        raise Exception(msg)

    return ftped_list


def ftp_put(cfg, cob_date=None):
    """Function returns the list of target file names posted to remote FTP site.
       List of files are specified in config TARGET/SOURCE_FILE_NAME"""
    log.info("Running ftp_put")
    
    if cob_date is None:
        cob_date = dt.get_current_cob()

    ftp = ftplib.FTP(timeout=240)
    ftp.connect(host=cfg.HOST, port=cfg.get('PORT', 21))
    ftp.login(user=cfg.USERID, passwd=base64.b64decode(cfg.PASSWD))
    ftp.set_pasv(cfg.PASSIVE)
    
    if cfg.get('REMOTE_DIR', ''):
        ftp.cwd(cfg.REMOTE_DIR)

    # If no target file names mentioned default it to source names.
    if not cfg.get('TARGET_FILE_NAME' ,[]):
        cfg.TARGET_FILE_NAME = [os.path.basename(fname) for fname in cfg.SOURCE_FILE_NAME]
        
    ftped_list = []
    for i, file_name in enumerate(cfg.SOURCE_FILE_NAME):
        file_name = fl.expand_file_name(file_name, cob_date)
        # Get the list of files from local site.
        try:
            source_file_name = fl.get_latest_file( "%s/%s"%(cfg.LOCAL_DIR, file_name))
        except:
            ''''''Try once more w/o directory name.''''''
            source_file_name = fl.get_latest_file(file_name)
        
        log.info("FTPing file: " + source_file_name)
        remote_file_name = cfg.TARGET_FILE_NAME[i]
        remote_file_name = fl.expand_file_name(remote_file_name, cob_date)
        ftp.storbinary('STOR ' + remote_file_name, open(source_file_name, 'rb'))
        ftped_list.append(source_file_name)
        
    ftp.quit()
    return ftped_list


def _get_ssh_host_key(host_name, ssh_host_file):
    """ get host key, if we know one"""
    log.info("Running _get_ssh_host_key")
    host_key = None
    try:
        host_keys = paramiko.util.load_host_keys(os.path.expanduser(ssh_host_file))
    except IOError:
        try:
            # try ~/ssh/ too, because windows can't have a folder named ~/.ssh/
            host_keys = paramiko.util.load_host_keys(os.path.expanduser('~/ssh/known_hosts'))
        except IOError:
            raise Exception('*** Unable to open host keys file')
    
    if host_keys.has_key(host_name):
        host_key_type = host_keys[host_name].keys()[0]
        host_key = host_keys[host_name][host_key_type]
        log.info('Using host key of type %s' % host_key_type)
        
    return host_key


def find_files_on_sftp(cfg, functor, filename = '.'):
    """Find files on SFTP server that return true on the functor provided.
    An optional filename to search for in a file name.
    The functor can use one of the following attributes to compare: 
        st_size (for file size), 
        st_mtime (for modified time stamp)
        st_uid (for user id)
    A lambda example: lambda x: x.st_mtime > time.mktime(time.strptime('20150220', '%Y%m%d') """
    log.info('Running find_files_on_sftp')
    sftp = _get_sftp_session(cfg)
    if cfg.get('REMOTE_DIR', ''):
        sftp.chdir(cfg.REMOTE_DIR)
    files = ['%s/%s'%(cfg.REMOTE_DIR, f.filename) for f in sftp.listdir_attr(filename) if functor(f)]
    
    return files


def _get_sftp_session(cfg):
    """Function returns SFTP session object. """
    log.info('Running _get_sftp_session')
    hostkey = _get_ssh_host_key(cfg.HOST, cfg.SSH_KNOWN_HOSTS)
    t = paramiko.Transport((cfg.HOST, cfg.PORT))
    if not cfg.PASSWD:
        pkey = paramiko.RSAKey.from_private_key_file(cfg.PKEY_FILE)
        t.connect(username=cfg.USERID, pkey=pkey, hostkey=hostkey)
    else:    
        t.connect(username=cfg.USERID, password=base64.b64decode(cfg.PASSWD), hostkey=hostkey)
        
    sftp = paramiko.SFTPClient.from_transport(t)

    return sftp


def sftp_get(cfg, cob_date=None):
    """Runs FTP on ssh layer to get the list of files from remote FTP site."""
    log.info("Running sftp_get")
    
    if cob_date is None:
        cob_date = dt.get_current_cob()
        
    if 'PORT' not in cfg:
        cfg.PORT = 22
        
    sftp = _get_sftp_session(cfg)
    
    if cfg.get('REMOTE_DIR', ''):
        sftp.chdir(cfg.REMOTE_DIR)

    ftped_list = []
    missing_files = []
    for i, file_name in enumerate(cfg.SOURCE_FILE_NAME):
        try:
            file_name = fl.expand_file_name(file_name, cob_date)
            try:
                # Get the list of files from remote site.
                files_list = sftp.listdir(file_name)
            except:
                # For some FTP servers the listdir with wildcard does not work. For those full file name is provided.
                if '*' in file_name:
                    import re

                    def functor(x):
                        file_pattern = file_name.replace('.', '\.').replace('*', '.*')
                        return re.match(file_pattern, x.filename, re.IGNORECASE)
                    files_list = [os.path.basename(filename) for filename in find_files_on_sftp(cfg, functor)]
                else:
                    files_list = [file_name]
            
            if not files_list:
                raise Exception('File %s not found on FTP site: %s' %(file_name, cfg.HOST))
            if len(files_list)>100:
                raise Exception('Too many files to retrieve, there is a 100 limit.')
            
            local_dir = cfg.get('LOCAL_DIR' ,'')
            if not local_dir:
                local_dir = tempfile.gettempdir()
            
            for file in files_list:
                source_file = file
                target_file = "%s/%s" % (local_dir, os.path.basename(file))
                if cfg.get('TARGET_FILE_NAME', []):
                    target_file = "%s/%s" % (local_dir, cfg.TARGET_FILE_NAME[i])
                    target_file = fl.expand_file_name(target_file, cob_date)
                    
                log.info("FTPing file source: %s target: %s" % (source_file, target_file))
                sftp.get(source_file, target_file)
                ftped_list.append(target_file)
        except Exception as e:
            log.info('Exception thrown: ' + str(e))
            # log the missing file and note down there is an exception and 
            # throw at the end after attempting on all files.
            missing_files.append(file_name)
            
    sftp.close()
    if missing_files:
        msg = 'Files not found on remote server: %s'%(', '.join(missing_files))
        log.info(msg)
        raise Exception(msg)
    
    return ftped_list


def sftp_put(cfg, cob_date=None):
    """Runs FTP on ssh layer to send the list of files to remote FTP site."""
    log.info("Running sftp_put")
    
    if cob_date is None:
        cob_date = dt.get_current_cob()
        
    if 'PORT' not in cfg:
        cfg.PORT = 22

    sftp = _get_sftp_session(cfg)
    
    if cfg.get('REMOTE_DIR', ''):
        sftp.chdir(cfg.REMOTE_DIR)
        
    local_dir = cfg.LOCAL_DIR
    if not local_dir:
        local_dir = tempfile.tempdir

    ftped_list = []
    for i, file_name in enumerate(cfg.SOURCE_FILE_NAME):
        file_name= fl.expand_file_name(file_name, cob_date)
            
        # Get the latest file to FTP
        try:
            source_file = fl.get_latest_file('%s/%s' % (local_dir, file_name))
        except Exception:
            '''''' Try once more w/o directory name.''''''
            try:
                source_file = fl.get_latest_file(file_name)
            except:
                msg = 'Files not found on local server: %s'%(file_name)
                log.info(msg)
                raise Exception(msg)
            
        target_file = source_file
        if cfg.get('TARGET_FILE_NAME', []):
            target_file = cfg.TARGET_FILE_NAME[i]
            target_file = fl.expand_file_name(target_file, cob_date)

        target_file = os.path.basename(target_file)
        log.info("FTPing file source: %s target: %s" %(source_file, target_file))
        sftp.put(source_file, target_file)
        ftped_list.append(source_file)
        
    sftp.close()
    return ftped_list


def run_ftp(ftp_cfg, cob_date=None):
    """Runs a simple FTP get/put as defined in config. Also, handles optional
    GPG de\encryption on the file."""
    log.info("Running run_ftp")
    files_ftped = []
    encryption_key = ftp_cfg.get('ENCRYPN_KEY', '')
    if 'get' in ftp_cfg.TYPE:
        files_ftped = ftp_get(ftp_cfg, cob_date=cob_date)
        if encryption_key:
            files_ftped = fl.decrypt_file(set(files_ftped), encryption_key, ftp_cfg.GPG_HOME)
    elif 'put' in ftp_cfg.TYPE:
        import glob
        files_list = [ fname
                        for wildcard_file_name in ftp_cfg.SOURCE_FILE_NAME 
                        for fname in glob.glob(fl.expand_file_name(ftp_cfg.LOCAL_DIR + wildcard_file_name, cob_date) )]
        if encryption_key:
            files_list = fl.encrypt_file(files_list, encryption_key, ftp_cfg.GPG_HOME)
        ftp_cfg.SOURCE_FILE_NAME = files_list
        files_ftped = ftp_put(ftp_cfg, cob_date=cob_date)
        if encryption_key:
            [os.unlink(fname) for fname in files_list]
        
    return files_ftped


def run_sftp(ftp_cfg, cob_date=None):
    """Runs FTP on secure shell to either get/put a file. Also, handles optional
    GPG de\encryption on the file."""
    log.info("Running run_sftp")
    encryption_key = ftp_cfg.get('ENCRYPN_KEY', '')
    files_ftped = []
    if 'get' in ftp_cfg.TYPE:
        files_ftped = sftp_get(ftp_cfg, cob_date=cob_date)
        if encryption_key:
            files_ftped = fl.decrypt_file(set(files_ftped), encryption_key, ftp_cfg.GPG_HOME)
    elif 'put' in ftp_cfg.TYPE:
        files_list = [ ftp_cfg.LOCAL_DIR + fl.expand_file_name(fname, cob_date) for fname in ftp_cfg.SOURCE_FILE_NAME ]
        if encryption_key:
            files_list = fl.encrypt_file(files_list, encryption_key, ftp_cfg.GPG_HOME)
        ftp_cfg.SOURCE_FILE_NAME = files_list
        files_ftped = sftp_put(ftp_cfg, cob_date=cob_date)

    return files_ftped


def do_ftp(site, cob_date=None):
    """Wrapper for running FTP on a given site."""
    log.info("Running do_ftp")
    ftp_cfg = env.get_config_object('ftp_cfg')
    if 'SSH_KNOWN_HOSTS' in ftp_cfg[site]:
        files_ftped = run_sftp(ftp_cfg[site], cob_date=cob_date)
    else:
        files_ftped = run_ftp(ftp_cfg[site], cob_date=cob_date)
    return files_ftped


def excepn_safe_ftp(ftp_cfg, cob_date):
    """An exception safe FTP get function to return the list of files received/missing."""
    
    log.info('Running excepn_safe_ftp')
    files_received, files_missing = [], []
    
    target_files = ftp_cfg.get('TARGET_FILE_NAME', [])
    if not target_files:
        target_files = [os.path.basename(tfile) for tfile in ftp_cfg.SOURCE_FILE_NAME]
    base_dir = ftp_cfg.LOCAL_DIR
    for sfile_idx, sfile in enumerate(ftp_cfg.SOURCE_FILE_NAME):
        try:
            log.info('Now FTPing file: ' + sfile)
            tfile = target_files[sfile_idx]
            ftp_cfg.SOURCE_FILE_NAME = [fl.expand_file_name(os.path.basename(sfile), cob_date)]
            
            if ftp_cfg['TYPE'] == 'get':
                local_dir = os.path.dirname(tfile)
                remote_dir = os.path.dirname(sfile)
            else:
                local_dir = '{0}{1}/'.format(base_dir, os.path.dirname(sfile))
                remote_dir = os.path.dirname(tfile)
                
            ftp_cfg.REMOTE_DIR = remote_dir or ftp_cfg.REMOTE_DIR
            ftp_cfg.LOCAL_DIR = local_dir or ftp_cfg.LOCAL_DIR
            
            ftp_cfg.TARGET_FILE_NAME = [tfile]
                
            if 'SSH_KNOWN_HOSTS' in ftp_cfg:
                files_list = run_sftp(ftp_cfg, cob_date=cob_date)
            else:
                files_list = run_ftp(ftp_cfg, cob_date=cob_date)
                
            logging.info('Ftp''ed file: ' + ','.join(files_list))
            files_received.extend(files_list)
        except Exception as e:
            files_missing = files_missing + ftp_cfg.SOURCE_FILE_NAME
            # Skip if file still not available on IFS Server
            message = str(e)
            if not any(['not found on FTP site' in message,
                        'No such file or directory' in message,
                        'Files not found on remote server' in message,
                        'Files not found on local server' in message]):
                raise
    
    return (files_received, files_missing)


def ftp_request_response(site, req_files, resp_files, cob_date):
    """This method will post a request file to FTP server and  pulls when the
    response/error file is available."""

    # Convert to list type
    if isinstance(req_files, str):
        req_files = [req_files]
        
    if isinstance(resp_files, str):
        req_files = [resp_files]
        
    # Throw if any request file is missing
    for afile in req_files:
        if not os.path.exists(afile):
            raise Exception('File %s missing'%(afile))
        
    # Remove response files if exist
    [os.remove(afile) for afile in resp_files if os.path.exists(afile)]
    
    # Post request file on to FTP server
    ftp_cfg = env.get_config_object('ftp_cfg')
    ftp_cfg = ftp_cfg[site]
    ftp_cfg.TYPE = 'put'
    ftp_cfg.SOURCE_FILE_NAME = req_files
    do_ftp(site, cob_date)
    
    # Now poll for response file. Poll timeout 10 minutes.
    ftp_cfg = env.get_config_object('ftp_cfg')
    ftp_cfg = ftp_cfg[site]
    ftp_cfg.TYPE = 'get'
    timeout = ftp_cfg.get('TIMEOUT', 600.0)
    poll_interval = ftp_cfg.get('POLL_INTERVAL', 30.0)
    files_received, files_missing, wait_time = [], [], 0.0
    while timeout > 0:
        
            log.info('%s: Still polling....(waiting since %6.2f mins)'%(dt.get_current_timestamp(), float(wait_time)))
            
            time.sleep(poll_interval)
            timeout = timeout - poll_interval
            wait_time = wait_time + float(poll_interval/60.0)
            
            ftp_cfg.LOCAL_DIR = os.path.dirname(req_files[0])
            ftp_cfg.SOURCE_FILE_NAME = resp_files
            ftp_cfg.TARGET_FILE_NAME = []
            files_received, files_missing = excepn_safe_ftp(ftp_cfg, cob_date)
            
            # Return if at least one file is found.
            if files_received:
                log.info('List of files received: %s'%(', '.join(files_received)))
                break
            
    return (files_received, files_missing)


def main(argv):
    logging.basicConfig(level=logging.DEBUG)
    cob_date = dt.get_current_cob()
    site = argv[1]
    if len(argv) == 3:
        cob_date = argv[2]

    logging.debug(" cob_date=%" + cob_date)
    ftp_cfg = env.get_config_object('ftp_cfg')
    
    def since_this_date(x):
        return x.st_mtime > time.mktime(time.strptime('20150219', '%Y%m%d'))
        
    files = find_files_on_sftp(ftp_cfg[site], since_this_date )
    logging.debug("%s=%s"%(site, files))
    
    def match_filenames(x):
        return 'ENL' in x.filename
    
    files = find_files_on_sftp(ftp_cfg[site], match_filenames )
    logging.debug("%s=%s"%(site, files))
    
    raise

    site = 'BBG_FTP_REQ_RESP'
    req_files = 'c:/temp/index_price.req'
    resp_files = ['index_price.out.gz']
    files_received, files_missing = ftp_request_response(site, req_files, resp_files, cob_date=cob_date)
    print('files_received=%s; files_missing=%s'%(files_received, files_missing))

    raise Exception()


if __name__ == "__main__":
    main(sys.argv)

'''