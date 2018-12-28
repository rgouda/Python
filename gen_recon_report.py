''' 
  SVN Info: $Id: gen_recon_report.py 4459 2015-05-20 15:35:56Z rgouda $
  SVN Revision: $Revision: 4459 $
  Description: Script to run comparison between two files. 
  Currently it supports csv files with any delimiters.
'''

from __future__ import print_function
import argparse 
import logging
import sys
import csv
import os
import tempfile
import re
import lib_excel_utils as excel
from collections import OrderedDict, defaultdict
from string import Template
import lib_date_utils as dt
import lib_ldenv as env
import lib_file_utils as fl
import lib_dbutils as db
from lib_mail import send_mail

log = logging.getLogger(__name__)
log.setLevel(level=logging.DEBUG)

def parse_args(cfg):
    '''Parse all command line arguments and assign default where required. '''
    parser = argparse.ArgumentParser(description = 'Generates short selling report for Compliance team')
    parser.add_argument('-cob_date', '--cob_date', default = dt.get_current_cob(), 
                        help = 'COB Date')
    parser.add_argument('-recon_tag_name', '--recon_tag_name', required = False, action = 'append', default = [],
                        help = 'Provide one or more recon tag names, either multiple tag names or comma separated list, e.g:tag_name1,tag_name2,...')
    parser.add_argument('-FILEA', '--FILEA', required = False, help = 'File name with path')
    parser.add_argument('-FILEB', '--FILEB', required = False, help = 'File name with path')
    parser.add_argument('-FILEDIFF', '--FILEDIFF', required = False, help = 'File name with path')
    parser.add_argument('-map_column_titles', '--map_column_titles', required = False, action = 'store_true',
                        help = 'To be implemented.')
    args = parser.parse_args()
    
    import operator
    args.recon_tag_name = set(reduce(operator.add, [tag_name.split(',') for tag_name in args.recon_tag_name]))
    
    if (args.FILEA or args.FILEB) and len(args.recon_tag_name) > 1:
        raise Exception('Only one recon tag allowed for input files (A or B) from command line arguments.')
    
    # If more than one recon tag name, ignore files passed from command line.
    args.fnames_from_config = False
    if not args.FILEA or len(args.recon_tag_name) > 1:
        args.fnames_from_config = True

    log.info(args)
    
    return args


class ReconFile(object):
    '''A recon file class. '''
    data_type_tests = [ int, float, long]
    num_types = [int, float, long]
    
    def __init__(self, file_name, sep = ','):
        self.file_name = file_name
        self.sep = sep
        self.col_headers = None
        self.col_data_types = None
        self.file_hkeys = dict()
        self.file_dict_list = defaultdict(dict)
        
    def __del__ (self):
        pass
        
    def _build_all_hash_keys(self, keys_dict, row):
        '''Function builds two indexes:
        (a) builds mapping of various keys to primary key. Then assigns to file level hash keys.
            file_hkeys[primary_key] = [pkey, skey1, skey2, ... ]
        (b) builds indexes 
            file_dict_list = [  # Index1 dictionary
                                {
                                 'colA_row1val:colB_row1val' : pkey1,
                                 'colA_row2val:colB_row2val' : pkey2,
                                 ...
                                },
                                
                                # Index2 dictionary
                                { 
                                 'colC_row1val:colD_row1val' : pkey1,
                                 'colC_row2val:colD_row2val' : pkey2,
                                 ...
                                }
                            ] '''
        row_hkeys = list()
        for i,k in enumerate(keys_dict):
            fields = keys_dict[k]
            key = ':'.join([re.sub('(^\s+|\s+$)', '', row[key]) for key in fields])
            if 'PRIMARY' in k:
                pkey = key
            row_hkeys.append(key)
            self.file_dict_list[i][key] = pkey
            
        self.file_hkeys[pkey] = row_hkeys

    def add_row(self, pkey, row, key_fields):
        self.dict_cache[pkey] = row
        self._build_all_hash_keys(key_fields, row)

    def get_row(self, pkey, lookup_keys, default=None):
        '''Function returns if match by pkey otherwise looks up for each hash key in its corresponding index. 
           Returns first match. Otherwise returns default.'''
        
        row = self.dict_cache.get(pkey, None)
        if row:
            return (pkey, row)
        
        for i,key in enumerate(lookup_keys):
            pkey = self.file_dict_list[i].get(key, None)
            if pkey:
                return (pkey, self.dict_cache[pkey])
            
        return (None, default)
        
    def cache(self, key_fields, agg_fields):
        ''' Function returns a cache of dictionary on requested keys.'''
        logging.debug('Loading file: ' + self.file_name)
        
        self.dict_cache = OrderedDict()
        for row_num, row in enumerate(self.read_next_line(), 2):
            
            hkey = ':'.join([re.sub('(^\s+|\s+$)', '', row[key]) for key in key_fields['PRIMARY']])
            #FIXME: Keep it commented after testing.
            if '60505146' in hkey or row_num in [78, 79]:
                logging.debug('Debug here')
                
            # Add to the cached row if it exists.
            cached_row = self.dict_cache.get(hkey, [])
            if not cached_row:
                self.dict_cache[hkey] = cached_row = row
            else:
                # Aggregate numeric values if the hash key is already cached.
                try:
                    for col_name, col_value in row.items():
                        if col_name in agg_fields:
                            col_value = col_value.replace(',', '')
                            data_type1 = self.get_data_type(col_value)
                            if data_type1 in ReconFile.num_types:
                                
                                # If it is third iteration the value will be numeric already.
                                tmp_val = cached_row[col_name]
                                tmp_val = tmp_val.replace(',', '')
                                
                                data_type2 = self.get_data_type(tmp_val)
                                cached_row[col_name] = str(data_type2(tmp_val) + data_type1(col_value))
                except:
                    msg = 'Exception thrown in col_name: %s col_value: %s'%(col_name, col_value)
                    log.info(msg)
                    raise
            
            self._build_all_hash_keys(key_fields, cached_row)
                
        return self.dict_cache

    
    def read_next_line(self):
        with open(self.file_name, 'rb') as csvfile:
            reader = csv.DictReader(csvfile, delimiter = self.sep)
            self.col_headers = reader.fieldnames
            for row in reader:
                yield row
    
    def get_data_type(self, value):
        '''Function returns and checks the value type in a string variable.'''
        for test in ReconFile.data_type_tests:
            try:
                test(value)
                return test
            except ValueError:
                continue
            # No match
        return str


def dump_report(report_file_name, fileA, fileB, diffs, recon_tag_name, file_header_text = None):
    ''' This will print the output to an Excel or CSV file.
    Output format: diff_status, hash_key, data_col1_A, data_col1_B, diff_col1_A, ....'''
    
    log.info("Running dump_report")
    rcfg = env.get_config_object('recon_cfg')
    rcfg = rcfg[recon_tag_name]
    
    def print_header(file_out, key_columns, output_columns):
        ''' Prints column headers to diff output file'''
        prev_col = None
        out_str = ''
        for col in output_columns:
            if re.match('^Diff', col, re.IGNORECASE):
                out_str = out_str + '${sep}"%s (%s)"' %(prev_col, col)
            elif col not in fileA.col_headers:
                # If col is not in fileA print col B header only.
                out_str = out_str + '${sep}"%s (%s)"'%(col, b_text)
            elif col not in fileB.col_headers:
                # If col is not in fileB print col A header only.
                out_str = out_str + '${sep}"%s (%s)"'%(col, a_text)
            else:
                # If col is in both file A and B then print both.
                out_str = out_str + '${sep}"%s (%s)"${sep}" %s (%s)"'%(col, a_text, col, b_text)
            
            prev_col = col

        print(file_header_text, file=file_out) if file_header_text else 0
        key_str = ':'.join(key_columns)
        out_str = Template('''"Diff Status"${sep}"Matching Key(%s)"%s'''%(key_str, out_str))
        print(out_str.safe_substitute(sep=','), file=file_out)
    
    def print_row(file_out, output_columns, row_A, row_B, diff):
        ''' print data row to diff output file.'''
        
        #Reverse diff and pop last two items: status and hkey
        diff.reverse()
        out_str = '%s${sep}"%s"'%(diff.pop(), diff.pop())
        for col in output_columns:
            if re.match('^Diff', col, re.IGNORECASE):
                out_str = '%s${sep}"%s"'%(out_str, diff.pop())
            elif col not in fileA.col_headers:
                # If col is not in fileA print col B value only.
                out_str = '%s${sep}"%s"'%(out_str, row_B.get(col, ''))
            elif col not in fileB.col_headers:
                # If col is not in fileB print col A value only.
                out_str = '%s${sep}"%s"'%(out_str, row_A.get(col, ''))
            else:
                # If col is in both files then print both
                out_str = '%s${sep}"%s"${sep}"%s"'%(out_str, row_A.get(col, ''), row_B.get(col, ''))
        
        out_str = Template(out_str)
        print(out_str.safe_substitute(sep=','), file=file_out)
    
    def print_trailer(file_out):
        ''' prints trailer to diff output'''
        trailer_rows = ['\nDiff Status:',
                    '  MATCH - All requested columns match',
                    '  NO MATCH - At least one column does not match',
                    '  MISSING IN %s FILE - No corresponding row found in file %s.'%(rcfg.B_TEXT, rcfg.B_TEXT),
                    '  MISSING IN %s FILE - No corresponding row found in file %s'%(rcfg.A_TEXT, rcfg.A_TEXT),
                   ]
        for out_str in trailer_rows:
            print(out_str, file=file_out)
    
    key_columns = rcfg.FILEA_KEY_COLS['PRIMARY']
    output_columns = rcfg.OUTPUT_COLUMNS
    a_text, b_text = rcfg.A_TEXT, rcfg.B_TEXT
    logging.info('Printing output to ' + report_file_name)
    
    try:
        row_num, hkey = 0, None
        with open(report_file_name, 'wb') as f:
            print_header(f, key_columns, output_columns)
            
            for row_num, diff in enumerate(diffs,1):
                hkey = diff[1]
#                 if 'PRE:00817Y108' in hkey:
#                     print('Debug here')
                key_list_A = fileA.file_hkeys.get(hkey, [])
                key_list_B = fileB.file_hkeys.get(hkey, [])
                (dummy, row_A) = fileA.get_row(hkey, key_list_B)
                (dummy, row_B) = fileB.get_row(hkey, key_list_A)
                print_row(f, output_columns, row_A, row_B, diff)
                
            print_trailer(f)
    except Exception as e:
        msg = 'Exception thrown in row number %d for key: %s'%(row_num, hkey)
        msg += '\n\twith message: ' + str(e)
        log.info(msg)
        raise

def all2(iterable):
    '''Returns True if all element in list are either True or Zero.'''
    for i in iterable:
        if type(i) == bool:
            if i == False:
                return False
        elif i != 0:
            return False
            
    return True


def threshold_diff(n, min_val = -1, max_val = 1):
    '''Returns 0 if the value is within threshold otherwise returns original value.'''
    if n <= max_val and n >= min_val:
        return 0
    else:
        return n 
        
def threshold_diff2(val_A, val_B, min_val = -1, max_val = 1):
    '''Returns 0 if the value is within threshold otherwise returns original value.'''
    n = float(isnull(val_A, 0.0)) - float(isnull(val_B, 0.0))
    if n <= max_val and n >= min_val:
        return 0
    else:
        return n
        
def threshold_percent_diff(val_A, val_B, min_val=-1.0, max_val=1.0):
    '''Calculates percentage difference and compares if it is within threshold.'''
    
    if float(val_A) == 0.0:
        val_A = 1.0
        
    n = 100 * ( float(isnull(val_A, 0.0)) - float(isnull(val_B, 0.0)) ) / float(isnull(val_A, 1.0))
    
    return threshold_diff(n, min_val, max_val)

    
def isnull(val, def_val):
    ''' Has the same functionality as database isnull/coalesce function.
    Returns val if it is a non-null value otherwise returns default value'''
        
    if re.match('^\s*$', str(val)):
        return def_val
    else:
        return val
    

def gen_recon_report(args, recon_tag):
    '''Runs recon functions, as configured, on every data rows between file 
    A and B. And then calls function to dump diff results.'''
    
    log.info("Running gen_recon_report")
    rcfg = env.get_config_object('recon_cfg')
    rcfg = rcfg[recon_tag]
    
    fileA = ReconFile(args.FILEA)
    fileB = ReconFile(args.FILEB)
    cached_dict_A = fileA.cache(rcfg.FILEA_KEY_COLS, rcfg.AGG_COLS)
    cached_dict_B = fileB.cache(rcfg.FILEB_KEY_COLS, rcfg.AGG_COLS)
    empty_row_A = dict([(hdr,'') for hdr in fileA.col_headers])
    empty_row_B = dict([(hdr,'') for hdr in fileB.col_headers])
    
    differences = []
    row_count = 0
    visited = {}
    # Here append keys that are in B but not in A.
    all_keys = cached_dict_A.keys() + [key for key in cached_dict_B.keys() if not cached_dict_A.has_key(key)]
    for row_count, key in enumerate(all_keys, 1):
        
        # If this primary key already visited skip.
        if visited.has_key(key):
            continue
        
        cond = None
        try:
            key_list_A = fileA.file_hkeys.get(key, [])
            key_list_B = fileB.file_hkeys.get(key, [])
            (pkey_A, row_A) = fileA.get_row(key, key_list_B)
            if 'DXU:DE000CBK1' in key:       #FIXME: Remove this after testing
                print('Debug here')
            (pkey_B, row_B) = fileB.get_row(key, key_list_A)  # Lookup on primary key and secondary keys
            
            status = 'NO MATCH'
            if not row_A:
                status = 'MISSING IN %s FILE'%(rcfg.A_TEXT)
                row_A = empty_row_A
                fileA.add_row(key, row_A, rcfg.FILEA_KEY_COLS)
            elif not row_B:
                status = 'MISSING IN %s FILE'%(rcfg.B_TEXT)
                row_B = empty_row_B
                fileB.add_row(key, row_B, rcfg.FILEB_KEY_COLS)
            else:
                # Mark A and B primary key look ups were found and thus mark them as visited
                visited[pkey_A] = visited[pkey_B] = True
                
            diffs = [eval(cond) for cond in rcfg.COMPARATOR]
            if all2(diffs):
                status = 'MATCH'

            differences.append([status, key] + diffs)
        except Exception as e:
            msg = 'Exception thrown while evaluating: %s in row number: %s with hash_key: %s'%(cond, row_count, key)
            msg += '\n\twith message: ' + str(e)
            log.info(msg)
            raise
            
    file_header_text = '"FILE %s: %s","FILE %s: %s"'%(rcfg.A_TEXT, args.ORIG_FILEA, rcfg.B_TEXT, args.ORIG_FILEB)
    out_file_name = fl.expand_file_name(args.FILEDIFF, args.cob_date)
    out_file_name = find_file_version(out_file_name, overwrite=True)
        
    dump_report(out_file_name, fileA, fileB, 
                differences, recon_tag, file_header_text = file_header_text)
    
    return out_file_name

def find_file_version(file_name, version_substr = '_DIFF', overwrite = False):
    '''Function returns next version of file name if it already exists on disk. If overwrite is set 
    to true and the file is available it will check if the file can be overwritten, if not will bump-up 
    the version and repeats until a version becomes available.'''
    
    next_file = file_name
    next_version_id = 1
    while os.path.exists(next_file):
        
        next_version_id = next_version_id + 1
        if next_version_id > 10:
            raise

        if overwrite:
            try:
                with open(next_file, 'wb') as f:
                    print('test', f)
                    break
            except:
                pass
            
        next_file = file_name.replace(version_substr, version_substr+'v%s'%(next_version_id))
        
    return next_file
    
def dump_query_outputs(tag_name, cfg, args):
    '''Dumps query outputs to files and returns their file names.'''
    log.info("Running dump_query_outputs")
    fileA  = tempfile.mktemp('.csv', 'fileA_')
    fileB  = tempfile.mktemp('.csv', 'fileB_')
    
    db_conn = db.get_db_connection(cfg.DB_SERVER_A)
    queryA = dt.expand_date_template(cfg[tag_name].QUERYA, args.cob_date)
    sql_rows = db.run_sql(db_conn, queryA)
    col_header = db.fetch_column_headers_from_cursor(sql_rows)
    fl.write_rows_to_csv_file(list(sql_rows), fileA, col_header = col_header)
    db_conn.close()
    
    db_conn = db.get_db_connection(cfg.DB_SERVER_B)
    queryB = dt.expand_date_template(cfg[tag_name].QUERYB, args.cob_date)
    sql_rows = db.run_sql(db_conn, queryB)
    col_header = db.fetch_column_headers_from_cursor(sql_rows)
    fl.write_rows_to_csv_file(list(sql_rows), fileB, col_header = col_header)
    db_conn.close()
    
    return (fileA, fileB)


def rename_file_col_headers(file_name, map_col_dict):
    '''Make a copy of the file name and rename it's column headers as defined 
       in dictionary.'''
    log.info("Running rename_file_col_headers")
    log.info('Creating temp file from %s'%(file_name))
    from re import sub
    xl = excel.get_excel_obj(file_name, 0)
    
    min_row, dummy, dummy, max_col = xl.get_row_col_range(first_row=1)
    last_col_name = sub('[0-9]', '', xl.get_cell_name(min_row, max_col) )
    data = xl.get_values_from_row_col_ranges('1:0', 'A:'+last_col_name)
    col_headers = data[0]
    data[0] = [map_col_dict.get(col_name, col_name) for col_name in col_headers]
    
    tmp_file_name = tempfile.mktemp(suffix='.csv', prefix='tmp_', dir = os.path.dirname(file_name))
    fl.write_rows_to_csv_file(data, tmp_file_name)
    
    return tmp_file_name


def main(argv):
    logging.basicConfig(level=logging.DEBUG)
    logging.info(dt.get_current_timestamp() + ": Started running script gen_recon_report.py")
    
    cfg = env.get_config_object()
    rcfg = env.get_config_object('recon_cfg')
    try:
        # Parse arguments
        args = parse_args(rcfg)
        recon_files, user_email_list = [], []
        for recon_tag in args.recon_tag_name:
            log.info('Now running reconciliation for the tag: ' + recon_tag)
            
            file_type = rcfg[recon_tag].INPUT_TYPE == 'FILE' 
            if file_type:
                # If file A and B are not passed in command line arguments, get it from config.
                if args.fnames_from_config:
                    args.FILEA = rcfg[recon_tag].FILEA
                    args.FILEB = rcfg[recon_tag].FILEB
                    args.FILEDIFF = rcfg[recon_tag].FILEDIFF
                
                args.FILEA = fl.get_latest_file(fl.expand_file_name(args.FILEA, args.cob_date))
                args.FILEB = fl.get_latest_file(fl.expand_file_name(args.FILEB, args.cob_date))
                args.FILEDIFF = fl.expand_file_name(args.FILEDIFF, args.cob_date)

                
            recon_query_type = 'QUERY' in rcfg[recon_tag].INPUT_TYPE
            if recon_query_type:
                # If the inputs are query then dump it's output to temporary file.
                args.FILEA, args.FILEB = dump_query_outputs(recon_tag, rcfg, args)
                args.ORIG_FILEA, args.ORIG_FILEB = args.FILEA, args.FILEB
                args.FILEDIFF = fl.expand_file_name(rcfg[recon_tag].FILEDIFF, args.cob_date)
                
            if args.map_column_titles:
                # If map columns defined, rename column names in first row of the file A and B.
                args.ORIG_FILEA, args.ORIG_FILEB = args.FILEA, args.FILEB
                args.FILEA = rename_file_col_headers(args.FILEA, OrderedDict(rcfg[recon_tag].MAP_COLUMN_TITLES))
                args.FILEB = rename_file_col_headers(args.FILEB, OrderedDict(rcfg[recon_tag].MAP_COLUMN_TITLES))
                
            rfile = gen_recon_report(args, recon_tag)
            recon_files.append(rfile)
            user_email_list = user_email_list + list(rcfg[recon_tag].USER_EMAIL_LIST)
            
            #Cleanup temporary files.
            if recon_query_type or args.map_column_titles:
                os.unlink(args.FILEA)
                os.unlink(args.FILEB)
        
        recon_files = ' '.join( ['<File://%s> \n'%(tmpfl) for tmpfl in recon_files] )
        msg = 'List of recon diff files links are below: \n' + recon_files
        recepients = list(set(user_email_list)) + list(cfg.IT_EMAIL_RECEPIENTS)
        send_mail(recepients, 'Recon Diff files for %s'%(','.join(args.recon_tag_name)), msg, sender = cfg.IT_EMAIL_SENDER)
        
        logging.info(dt.get_current_timestamp() + ": Finished running script gen_recon_report.py")
    except Exception, e:
        excepn_msg = "Failed to run script: " + argv[0] + "\nException message:\n" + str(e)
        logging.debug(excepn_msg)
        send_mail(cfg.IT_EMAIL_RECEPIENTS, "Failed to run script: " + argv[0], excepn_msg, sender = cfg.IT_EMAIL_SENDER)  
        raise

if __name__ == "__main__":
    main(sys.argv)
