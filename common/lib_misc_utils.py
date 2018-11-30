from datetime import datetime
import logging


def get_current_timestamp(time_format=None):
    """Returns current time string value in the requested or default format.
       The default format is - '2012-07-13 21:00:00' """
    if time_format is None:
        time_format = '%Y-%m-%d %H:%M:%S'
    return datetime.today().strftime(time_format)


loggers = {}


def get_formatted_logger(name=__name__, level=logging.DEBUG,
                         fmt='%(asctime)s %(name)s %(levelname)s %(message)s'):
    """A helper logger """
    global loggers
    if loggers.get(name):
        return loggers.get(name)
    else:
        logger = logging.getLogger(name=name)
        logger.setLevel(level=level)

        if fmt:
            sh = logging.StreamHandler()
            sh.setLevel(level=level)
            sh.setFormatter(logging.Formatter(fmt=fmt))
            logger.addHandler(sh)

        loggers.update(dict(name=logger))

    return logger


def get_password(lookup_key, def_val):
    import keyring
    return keyring.get_password('etl_mail', lookup_key) or def_val


if __name__ == "__main__":
    log = get_formatted_logger()
    log.info('Logger is logging here.')
    log.info(get_current_timestamp())
