"""
    SVN Info: $Id$
    Library for File related functions.
"""
import glob
import time
import os
import logging
import gnupg
import csv

__version__ = "$Revision$"
log = logging.getLogger(__name__)
log.setLevel(level=logging.DEBUG)


def is_file_empty(file_name):
    return os.stat(file_name).st_size


def get_latest_file(file_glob_str):
    """Returns the latest timestamped for a wild card file name"""
    log.info("Running get_latest_file")
    
    date_file_list = []
    for f in glob.glob(file_glob_str):
        stats = os.stat(f)
        lastmod_date = time.localtime(stats[8])
        date_file_list.append((lastmod_date, f))
    date_file_list.sort(reverse=True)
    
    if not date_file_list:
        raise Exception("No files found for " + file_glob_str)
    
    logging.debug("Latest file: "+date_file_list[0][1])
    return date_file_list[0][1]


def get_all_files(file_glob_str):
    """Returns the list of files for a wild card file name by default sorts by timestamp."""
    log.info("Running get_all_files")
    
    date_file_list = []
    for f in glob.glob(file_glob_str):
        stats = os.stat(f)
        lastmod_date = time.localtime(stats[8])
        date_file_list.append((lastmod_date, f))
        
    date_file_list.sort()
    date_file_list = [ftuple[1] for ftuple in date_file_list]
    
    if not date_file_list:
        raise Exception("No files found for " + file_glob_str)
    
    logging.debug("Found %d files" % (len(date_file_list)))
    return date_file_list


def which(program):
    """This function is equivalent to UNIX which utility.
       Courtesy: Jay@StackOverflow"""
    log.info("Running which")

    def is_exe(path):
        return os.path.isfile(path) and os.access(path, os.X_OK)
    
    fpath, dummy = os.path.split(program)
    if fpath:
        if is_exe(program):
            return program
    else:
        for path in os.environ['PATH'].split(os.pathsep):
            exe_file = os.path.join(path, program)
            if is_exe(exe_file):
                return exe_file
    return None
    

def decrypt_file(file_list, gpg_home=''):
    """Decrypt files using PGP algorithm. Decrypt key is not required."""
    log.info("Running decrypt_file")
    # GPG debug info is noisy, turn them off temporarily 
    # and restore original at the end.
    tmp_save_level = logging.getLogger().level
    logging.getLogger().setLevel(logging.ERROR)
    
    gpg = gnupg.GPG(homedir=gpg_home)
    ret_files_list = []
    for file_name in file_list:
        output_file = file_name.replace('.pgp', '').replace('.gpg', '')
        gpg.decrypt(open(file_name, "rb"), output=output_file, passphrase='hedge fund')
        if not os.path.exists(output_file):
            raise Exception('Decryption failed on file ' + file_name)
        ret_files_list.append(output_file)
        os.unlink(file_name)
    
    logging.getLogger().setLevel(tmp_save_level)
    return ret_files_list


def encrypt_file(file_list, encryption_key, gpg_home=''):
    """Encrypt files using PGP algorithm"""
    log.info("Running encrypt_file")
    # GPG debug info is noisy, turn them off temporarily 
    # and restore it at the end.
    tmp_save_level = logging.getLogger().level
    logging.getLogger().setLevel(logging.ERROR)
    
    gpg = gnupg.GPG(homedir=gpg_home)
    ret_files_list = []
    for file_name in file_list:
        # Skip any encrypted files. 
        if file_name.endswith('.pgp'):
            continue
        
        output_file = file_name + '.pgp'
        gpg.encrypt(open(file_name, 'rb'), encryption_key, always_trust=True, output=output_file)
        if not os.path.exists(output_file):
            raise Exception('Encryption failed on file ' + file_name)
        ret_files_list.append(output_file)
        
    logging.getLogger().setLevel(tmp_save_level)
    return ret_files_list


def extract_from_zip_file(zip_file_name, files_prefix_to_extract=None, extract_dir='', passwd = None):
    """Extracts the requested files list (or defdault all) from zip file name.
    The requested files can be partial string that matches within the zip file 
    will be extracted. If extract_dir not provided it will extract to zip file 
    location."""
    log.info("Running extract_from_zip_file")
    if files_prefix_to_extract is None:
        files_prefix_to_extract = list()
    import zipfile
    zip_file_name = get_latest_file(zip_file_name)
    zip_obj = zipfile.ZipFile(zip_file_name)
    
    if files_prefix_to_extract: 
        # Construct full file name from prefixes.
        zip_file_list = zip_obj.namelist()
        files_prefix_to_extract = [zip_file for file_prefix in files_prefix_to_extract 
                                   for zip_file in zip_file_list if file_prefix in zip_file]
    else:
        files_prefix_to_extract = zip_obj.namelist()
        
    if not extract_dir:
        extract_dir = os.path.dirname(zip_file_name)
    
    [zip_obj.extract(file_name, path=extract_dir, pwd=passwd) for file_name in files_prefix_to_extract]
    zip_obj.close()
    return files_prefix_to_extract


def reset_password_excel_file(vb_script_name, passwd, source_file_name):
    """Resets the password on Excel file and returns an unprotected file name."""
    log.info("Running reset_password_excel_file")
    import tempfile
    import subprocess

    script_name = tmp_file_name = ''
    try:
        fname, ext = os.path.splitext(os.path.basename(source_file_name))
        tmp_file_name = tempfile.mktemp(ext, "tmp_" + fname)
        script_name = "{}".format(vb_script_name)
        source_file_name = source_file_name.replace('/', '\\')
        import base64
        passwd = base64.b64decode(passwd)
        subprocess.call([script_name, source_file_name, tmp_file_name, passwd], shell=True)
        logging.debug("Unprotected file name: " + tmp_file_name)
    except Exception as e:
        print('Command: ', [script_name, source_file_name, tmp_file_name, passwd])
        print('Exception string: ', str(e))
        raise
    return tmp_file_name


def write_rows_to_csv_file(data, file_name=None, sep=',', col_header=None, file_mode='w+',
                           quoting=csv.QUOTE_MINIMAL):
    """Function dumps matrix data to a file name."""
    import tempfile

    log.info("Running write_sql_rows_to_file")
    if file_name is None:
        file_name = tempfile.mktemp(".csv", "tmp_")
    log.debug("Writing rows to file:" + file_name)
    with open(file_name, mode=file_mode, newline='') as f:
        csv_writer = csv.writer(f, delimiter=sep, quoting=quoting)
        if col_header is not None:
            csv_writer.writerow(col_header)
        csv_writer.writerows(data)
    return file_name
    
    
def expand_file_name(file_name, cob_date):
    """Expands file name"""
    log.info('Running expand_file_name')
    import lib_date_utils as dt
    (yy, mm, dd, mmm, month) = dt.convert_date_format(cob_date, to_format='%Y-%m-%d-%b-%B').split('-')
    
    m = mm
    if int(m) < 10:
        m = str(int(m))
        
    d = dd
    if int(d) < 10:
        d = str(int(d))

    file_name = file_name.replace('<YYYY>', yy)
    file_name = file_name.replace('<YY>', yy[-2:])
    file_name = file_name.replace('<MM>', mm)
    file_name = file_name.replace('<M>', m)
    file_name = file_name.replace('<MONTH>', month)
    file_name = file_name.replace('<DD>', dd)
    file_name = file_name.replace('<D>', d)
    file_name = file_name.replace('<MMM>', mmm)
    file_name = file_name.replace('<COB_DATE>', cob_date)
        
    return file_name
    
    
def main():
    logging.basicConfig(level=logging.DEBUG)
    print(expand_file_name('test_file_name_<YYYY><MMM><D>', '20121201'))
    print(expand_file_name('test_file_name_<YYYY><MMM><D>', '20121210'))
    
    data = [['ABC1,1', 'DEF1', 'GHI1', 'JKL1'],
            ['ABC2', 'DEF2,2', 'GHI2', 'JKL2'],
            ['ABC3', 'DEF3', 'GHI3', 'JKL3'],
            ['ABC4', 'DEF4', 'GHI4', 'JKL4'],
            ['ABC5', 'DEF5', 'GHI5', 'JKL5'],
            ]
    print(write_rows_to_csv_file(data))
    
    with open('c:/temp/file1.txt', 'w+') as f:
        f.write('Test')
        time.sleep(1)
    with open('c:/temp/file2.txt', 'w+') as f:
        f.write('Tets2')
        
    print("Latest file=", get_latest_file("c:\\temp\\file*.txt"))
    print("which ls=", which('ls.exe'))
    print("which ls=", which('dir.exe'))
    import base64
    passwd = base64.b64encode('JPM5730813')
    reset_password_excel_file('/Users/rgouda/workspace/feeds/unlockExcel.vbs', passwd,
                              '/tmp/0000017015_20121019_FE_v01.xls')
    
    
if __name__ == "__main__":
    main()
