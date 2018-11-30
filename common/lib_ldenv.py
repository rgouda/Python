# ------------------------------------------------------------------------------
# VCS Info: $Id$
# Loads config variables from the config file; unlike Perl loads this does not
# initialize environment variables.
# ------------------------------------------------------------------------------

import os
import logging
import re
from config import Config
import lib_memoize_decorator_pattern as decorator
from lib_misc_utils import get_formatted_logger

log = get_formatted_logger(name=__name__)

def load_env(config_file, parent=None):
    """Loads config file and returns config object of param name as attributes.
       Uses environment specific config file if environment variable is set.
       For e.g. if ENV_NAME='DEV' it will load config from etl_archive.config"""
    env_name = os.environ.get("ENV_NAME", "").lower()
    if env_name:
        env_name = "_" + env_name
    config_file = re.sub('.config$', '{0}.config'.format(env_name), config_file)
    log.debug("Reading from config file:" + config_file)
    with open(config_file) as cfg_file:
        cfg_obj = Config(cfg_file, parent=parent)
    return cfg_obj

def get_batch_home():
    """initialize batch home"""
    if 'FNL_DIR' in os.environ:
        batch_home = os.environ['FNL_DIR']
    elif 'BATCH_HOME' in os.environ:
        batch_home = os.environ['BATCH_HOME']
    else:
        batch_home = '.'
    return batch_home

class AppCfg:
    value = ''
    #TODO: Change this to setter/getter attributes.
    @staticmethod
    def register(val=''):
        if val:
            AppCfg.value=val
        return AppCfg.value

    @staticmethod
    def name():
        return AppCfg.value

    @staticmethod
    def get_config_file():
        return os.path.join(get_batch_home(), "Config/{}.config".format(AppCfg.name()))

@decorator.Memoize
def get_config_object(app_name='', parent=None):
    if not app_name:
        app_name = AppCfg.name()

    if not app_name:
        raise Exception('App name required.')

    filename = AppCfg.get_config_file()
    cfg = load_env(filename, parent=parent)

    return cfg

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    AppCfg.register('etl_archive')
    cfg = get_config_object()
    print('CONFIG_DIR=', cfg.CONFIG_DIR)
