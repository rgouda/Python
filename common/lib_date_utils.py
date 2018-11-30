"""Date related utility functions
TODO: Implement using Arrow library.
"""
__version__ = "$Revision$"
# SVN Info: $Id$

from datetime import timedelta
import datetime
import math
import logging
import lib_memoize_decorator_pattern as decorator
import lib_ldenv as env
import os
# import lib_functors as func

log = logging.getLogger(__name__)
log.setLevel(level=logging.DEBUG)

# Description: All date related utility functions belong here.
# Define the weekday mnemonics to match the date.weekday function
(MON, TUE, WED, THU, FRI, SAT, SUN) = range(7)


def workday_diff(start_date, end_date, whichdays=(MON,TUE,WED,THU,FRI)):
    """
    Calculate the number of working days between two dates inclusive
    (start_date <= end_date).

    The actual working days can be set with the optional whichdays
    parameter (default is MON-FRI)
    """
    start_date = convert_str_to_date(start_date)
    end_date = convert_str_to_date(end_date)
    
    swapped = False
    if start_date > end_date:
        start_date, end_date = end_date, start_date
        swapped = True
    delta_days = (end_date - start_date).days + 1
    full_weeks, extra_days = divmod(delta_days, 7)
    # num_workdays = how many days/week you work * total # of weeks
    num_workdays = (full_weeks + 1) * len(whichdays)
    # subtract out any working days that fall in the 'shortened week'
    for d in range(1, 8 - extra_days):
        if (end_date + timedelta(d)).weekday() in whichdays:
            num_workdays -= 1
            
    if swapped:
        num_workdays = -num_workdays
        
    return num_workdays


def workday_add(start_date, work_days, whichdays=(MON,TUE,WED,THU,FRI), skip_holidays=True):
    """Adds to a given date a number of working days
       for example 2009/12/04 is a friday - adding one weekday will return 2009/12/07 
       workdayadd(date(year=2009,month=12,day=4),1) 
       datetime.date(2009, 12, 7)
    """
    # If there is nothing to add, just return
    if not work_days:
        return start_date
    
    start_date = convert_str_to_date(start_date)
    
    # DivMod returns unexpected numbers for negative work_days, 
    # so sign is reserved in later steps.     
    weeks, days = divmod(abs(work_days),len(whichdays))
    weeks = int(math.copysign(weeks, work_days))
    days = int(math.copysign(days, work_days))
    
    # An edge case where days added cross over weekend.
    if len(whichdays) < 7 and weeks == 0:
        if (days + start_date.weekday()) > FRI:
            days = days + 2
    
    new_date = start_date + timedelta(weeks=weeks)
    new_date = new_date + timedelta(days=days)
    
    if skip_holidays:
        # Pad any holidays between start and new date.
        date_from = convert_date_to_str(start_date)
        date_to = convert_date_to_str(new_date)
        dates = gen_date_ranges(date_from, date_to, whichdays=whichdays, skip_holidays=False)
        holidays = len([1 for tdate in dates if is_holiday(tdate)])
        new_date = workday_add(new_date, holidays, whichdays=whichdays, skip_holidays=False)

    forward = True
    if work_days < 0: forward = False
    new_date = get_nearest_work_day(new_date, forward=forward, whichdays=whichdays, 
                                    skip_holidays=skip_holidays)

    return new_date


def get_current_cob(nDaysFromToday=1, skip_holidays=True):
    """Calculates nth (default 1) business date from current date."""
    (MON, TUE, WED, THU, FRI, SAT, SUN) = range(7)
    weekend=(SAT, SUN)
    today = datetime.date.today()
    cob_date =  today - datetime.timedelta(nDaysFromToday)
    if( cob_date.weekday() in weekend ):
        deltaDays = cob_date.weekday() - FRI
        cob_date = cob_date - datetime.timedelta(deltaDays)
        
    if skip_holidays:
        cob_date = get_nearest_work_day(cob_date, forward=False, skip_holidays=skip_holidays)
        cob_date = convert_str_to_date(cob_date)
        
    return cob_date.strftime("%Y%m%d")


def get_current_timestamp(time_format=None):
    """Returns current time string value in the requested or default format.
       The default format is - '2012-07-13 21:00:00' """
    if time_format is None:
        time_format = '%Y-%m-%d %H:%M:%S'
    return datetime.datetime.today().strftime(time_format)


def get_nearest_work_day(start_date, forward=True, whichdays=(MON,TUE,WED,THU,FRI), 
                         skip_holidays=True):
    """If the date is on weekend, returns next work day/Monday. If forward is set to
       False returns previous work day/Friday. A day is work day if defined in 
       whichdays, default is Mon-Fri."""
    
    start_date = convert_str_to_date(start_date)
    new_date = start_date
    while new_date.weekday() not in whichdays or (skip_holidays and is_holiday(new_date)):
        if forward:
            new_date += timedelta(days=1)
        else:
            new_date += timedelta(days=-1)
    return new_date.strftime("%Y%m%d")

def get_previous_work_day(start_date, whichdays=(MON,TUE,WED,THU,FRI), skip_holidays=True):
    """Returns next work day. """
    start_date = convert_str_to_date(start_date)
    new_date = start_date + datetime.timedelta(days=-1)
    return get_nearest_work_day(new_date, forward=False, whichdays=whichdays, skip_holidays=skip_holidays)


def get_next_work_day(start_date, whichdays=(MON,TUE,WED,THU,FRI), skip_holidays=True):
    """Returns next work day. """
    if isinstance(start_date, str):
        start_date = datetime.datetime.strptime(start_date, '%Y%m%d')
        start_date = start_date.date()

    new_date = start_date + datetime.timedelta(days=1)
    return get_nearest_work_day(new_date, forward=True, whichdays=whichdays, skip_holidays=skip_holidays)

def start_of_month(sdate=None, whichdays=(MON,TUE,WED,THU,FRI), skip_holidays=True):
    """Returns first business day of the month."""
    if sdate is None:
        sdate = get_current_timestamp('%Y%m%d')
        
    socm = sdate[0:6] + '01'
    return get_nearest_work_day(socm, whichdays=whichdays, skip_holidays=skip_holidays)


def next_month(sdate=None, whicdays=(MON,TUE,WED,THU,FRI), skip_holidays=True):
    """Returns last day of the month as requested in whichdays."""
    if sdate is None:
        sdate = get_current_timestamp('%Y%m%d')
        
    # Add the lowest nr. of days in a month and then increment 
    # until it lands on next month.
    socm = sdate[0:6] + '28'
    while start_of_month(socm, whichdays=whichdays, skip_holidays=skip_holidays) == start_of_month(sdate, whichdays=whichdays, skip_holidays=skip_holidays):
        socm = get_next_work_day(socm, whichdays = whichdays, skip_holidays = skip_holidays)
    
    socm = socm[0:6] + sdate[-2:]
    return get_nearest_work_day(socm, whichdays=whichdays, skip_holidays=skip_holidays)


def start_of_year(sdate=None, whichdays=(MON,TUE,WED,THU,FRI), skip_holidays=True):
    """Returns first business day of the year."""
    if sdate is None:
        sdate = get_current_timestamp('%Y%m%d')
        
    socm = sdate[0:4] + '0101'
    return get_nearest_work_day(socm, whichdays=whichdays, skip_holidays=skip_holidays)


def start_of_week(sdate=None, whichdays=(MON,TUE,WED,THU,FRI), skip_holidays=True):
    """Returns first day of the week i.e. Monday."""
    if sdate is None:
        sdate = get_current_timestamp('%Y%m%d')
    sdate = datetime.datetime.strptime(sdate, '%Y%m%d')
    delta_days = sdate.weekday() - MON
    sdate = sdate - datetime.timedelta(days=delta_days)
    return get_nearest_work_day(sdate.strftime("%Y%m%d"), skip_holidays=skip_holidays)


def start_of_quarter(sdate=None, whichdays=(MON,TUE,WED,THU,FRI), skip_holidays=True):
    """Returns first work day of the quarter of the requested date (default current date.)"""
    if sdate is None:
        sdate = get_current_timestamp('%Y%m%d')
    qrtr_month = "%02d" % ((int(sdate[4:6]) - 1) // 3 * 3  + 1)
    return get_nearest_work_day(sdate[0:4] + qrtr_month + '01', whichdays=whichdays, skip_holidays=skip_holidays)


def convert_str_to_date(date, time_format='%Y%m%d'):
    """Convert date string to datetime.date data type."""
    if isinstance(date, str):
        date = datetime.datetime.strptime(date.strip(), time_format)
        date = date.date()
        
    return date


def convert_date_to_str(date, time_format='%Y%m%d'):
    """Convert date to time string format (default YYYYMMDD)"""
    
    # Convert to date type if input argument is string.
    if isinstance(date, str):
        date = convert_str_to_date(date, time_format)
        
    return date.strftime(time_format)


def convert_date_format(date, to_format, from_format='%Y%m%d'):
    """Converts date to requested date format."""
    date = convert_str_to_date(date, time_format = from_format)
    return convert_date_to_str(date, time_format = to_format)


def get_week_days(weekdays_only=True):
    """Returns MON-FRI or MON-SUN"""
    if weekdays_only:
        return (MON,TUE,WED,THU,FRI)
    else:
        return (MON,TUE,WED,THU,FRI, SAT, SUN)


@decorator.Memoize
def _read_holiday_schedule(file_name):
    """Returns the list of holidays"""
    # FIXME: Holiday file if require. For now We will just return empty
    # set if no holiday file.
    if not os.path.exists(file_name):
        return []
    with open(file_name, 'rU') as f:
        schedule = f.readlines()
        schedule = [ convert_str_to_date(h.replace('\n', '').replace('\r', '')) for h in schedule ]
        
    return schedule


def is_holiday(date):
    """Returns True if the date is found in holiday file. Otherwise returns
       false."""
    
    holiday_file = env.get_batch_home() + '/config/holiday_schedule.txt'
    holiday_schedule = _read_holiday_schedule(holiday_file)
        
    date = convert_str_to_date(date)
    if date in holiday_schedule:
        return True
    
    return False


def gen_date_ranges(from_date, to_date, whichdays=(MON,TUE,WED,THU,FRI), skip_holidays=True):
    """Function returns list of dates between requested dates."""
    if from_date > to_date:
        from_date, to_date = to_date, from_date
    
    ret_dates = [get_nearest_work_day(from_date, whichdays = whichdays, skip_holidays = skip_holidays)]
    while(ret_dates[-1] < to_date):
        ret_dates.append(get_next_work_day(ret_dates[-1], whichdays=whichdays, skip_holidays=skip_holidays))
        
    return ret_dates

def workday_delta(sdate, days=0, months=0, weeks=0, years=0,
                  whichdays=(MON,TUE,WED,THU,FRI), skip_holidays=True):
    
    if sdate is None:
        sdate = get_current_timestamp('%Y%m%d')

    if days:    
        sdate = workday_add(sdate, days, whichdays=whichdays, skip_holidays=skip_holidays)
    
    if weeks:
        sdate = workday_add(sdate, weeks*7, whichdays=get_week_days(False), skip_holidays=False)
        
    if months:
        date = convert_str_to_date(sdate)
        newmonth = ((( date.month - 1) + months) % 12) + 1
        newyear = int(date.year + ((date.month - 1) + months ) / 12)
        date = datetime.date(newyear, newmonth, date.day).strftime('%Y%m%d')
        sdate = convert_date_to_str(date)
        
    if years:
        date = convert_str_to_date(sdate)
        newyear = date.year + years
        date = datetime.date(newyear, date.month, date.day).strftime('%Y%m%d')
        sdate = convert_date_to_str(date)
    
    return get_nearest_work_day(sdate, whichdays=whichdays, skip_holidays=skip_holidays)


def expand_date_template(date_string, cob_date, **kwargs):
    """Expands various date patterns to string. It can also accept ambigous key/value pair."""
    log.info('Running expand_date_template')
    (yy, mm, dd, mmm, month, hr, mins, sec) = convert_date_format(cob_date,
                                                                  to_format = '%Y-%m-%d-%b-%B-%H-%M-%S').split('-')
    
    m = mm
    if int(m) < 10:
        m = str(int(m))
        
    d = dd
    if int(d) < 10:
        d = str(int(d))

    date_string = date_string.format(YYYY=yy, YY=yy[-2:],MM=mm, M=m, MONTH=month, DD=dd,
                                     D=d, MMM=mmm, HR=hr, MIN=mins, SEC=sec,
                                     COB_DATE=cob_date)
    
    for pattern, value in kwargs.items():
        date_string = date_string.format(pattern, value)
    
    return date_string


def convert_xldate(val):
    """ Converts Excel integer date to Python datetime object"""
    # if func.is_number(val):
    return datetime.datetime(1899,12,30) + datetime.timedelta(days=int(float(val)))
        
        
if __name__ == "__main__":
    #print workday_sub(date(2012,03,19), date(2012,03,27))
    print(gen_date_ranges('20150401', '20150431'))
    print("CURRENT_COB = " + get_current_cob())
    print("ADD -7 WORK DAYS:" + workday_add('20120703', -7))
    print("ADD 4 WORK DAYS:" + workday_add('20120703', 4))
    print("ADD 5 WORK DAYS:" + workday_add('20120703', 5))
    print("ADD 6 WORK DAYS:" + workday_add('20120703', 6))
    print("ADD 3 WORK DAYS:" + workday_add('20120703', 3))
    print("ADD -1 WORK DAYS:" + workday_add('20130109', -1))
    print("ADD -2 WORK DAYS:" + workday_add('20130109', -2))
    print("ADD -3 WORK DAYS:" + workday_add('20130109', -3))
    print("ADD -4 WORK DAYS:" + workday_add('20130109', -4))
    print("ADD -5 WORK DAYS:" + workday_add('20130109', -5))
    print("ADD -6 WORK DAYS:" + workday_add('20130109', -6))
    print("ADD -7 WORK DAYS:" + workday_add('20130109', -7))
    print("ADD -30 WORK DAYS:" + workday_add('20130109', -30, whichdays=get_week_days(False), skip_holidays=False))
    
    print("workday_delta -1 day for 20120703:" + workday_delta('20120703', days=-1))
    print("workday_delta +1 day for 20120703:" + workday_delta('20120703', days=1))
    print("workday_delta +30 days for 20120703:" + workday_delta('20120703', days=30))
    print("workday_delta -1 week for 20120703:" + workday_delta('20120703', weeks=-1))
    print("workday_delta +1 week for 20120703:" + workday_delta('20120703', weeks=1))
    print("workday_delta +4 weeks for 20120703:" + workday_delta('20120703', weeks=4))
    print("workday_delta -1 month for 20130109:" + workday_delta('20130109', months=-1))
    print("workday_delta +1 month for 20130109:" + workday_delta('20130109', months=+1))
    print("workday_delta -11 month for 20130109:" + workday_delta('20130109', months=-11))
    print("workday_delta +11 month for 20130109:" + workday_delta('20130109', months=+11))
    
    print("current time1=", get_current_timestamp(time_format='%m/%d/%Y:%H:%M:%S'))
    print("current time2=", get_current_timestamp())
    print("current time3=", get_current_timestamp(time_format=':%H:%M:%S'))
    print('Date 20120707: next_work_day =', get_nearest_work_day('20120707'), "prev_work_day =", get_nearest_work_day('20120707', forward=False))
    print('Date 20120708: next_work_day =', get_nearest_work_day('20120708'), "prev_work_day =", get_nearest_work_day('20120708', forward=False))
    print('Date 20120709: next_work_day =', get_nearest_work_day('20120709'), "prev_work_day =", get_nearest_work_day('20120709', forward=False))
    print('Date 20120701: next_work_day =', get_nearest_work_day('20120701'), "prev_work_day =", get_nearest_work_day('20120701', forward=False))
    print('get_next_work_day(20120706) =', get_next_work_day('20120706'))
    print('get_next_work_day(20120707) =', get_next_work_day('20120707'))
    print('get_next_work_day(20120708) =', get_next_work_day('20120708'))
    print('get_next_work_day(20120709) =', get_next_work_day('20120709'))
    print('get_previous_work_day(20120706) =', get_previous_work_day('20120706'))
    print('get_previous_work_day(20120707) =', get_previous_work_day('20120707'))
    print('get_previous_work_day(20120708) =', get_previous_work_day('20120708'))
    print('get_previous_work_day(20120709) =', get_previous_work_day('20120709'))
    print('SOM=', start_of_month())
    print('SOM 20120617=', start_of_month('20120617'))
    print("SOM(20120704)=", start_of_month('20120719'))
    print('SOY=', start_of_year('20110119'))
    print('SOY=', start_of_year('20120801'))
    print('SOY=', start_of_year('20120801', skip_holidays=False))
    print('SOQ=', start_of_quarter())
    print('SOQ(20120101)=', start_of_quarter('20120101'))
    print('SOQ(20120210)=', start_of_quarter('20120210'))
    print('SOQ(20120329)=', start_of_quarter('20120329'))
    print('SOQ(20120430)=', start_of_quarter('20120430'))
    print('SOQ(20120501)=', start_of_quarter('20120501'))
    print('SOQ(20120605)=', start_of_quarter('20120601'))
    print('SOQ(20120705)=', start_of_quarter('20120705'))
    print('SOQ(20120805)=', start_of_quarter('20120805'))
    print('SOQ(20120905)=', start_of_quarter('20120905'))
    print('SOQ(20121005)=', start_of_quarter('20121005'))
    print('SOQ(20121105)=', start_of_quarter('20121105'))
    print('SOQ(20121205)=', start_of_quarter('20121205'))
    print('SOW(20120714)=', start_of_week('20120714'))
    print('SOQ(20120102)=', start_of_quarter('20120102'))
    print('is_holiday(20120102)', is_holiday('20120102'))

    print('convert_date_to_str(20120827) =', convert_date_to_str('20120827'))
    print('convert_date_to_str(20122708, %Y%d%m) =', convert_date_to_str('20122708', '%Y%d%m'))
    print('convert_str_to_date(20120827) =', convert_str_to_date('20120827'))
    print('convert_str_to_date(20122708, %Y%d%m) =', convert_str_to_date('20122708', '%Y%d%m'))
    print('convert_date_to_str(datetime.datetime.today())=', convert_date_to_str(datetime.datetime.today(), '%Y%m%d'))
    whichdays = (MON, TUE, WED, THU, FRI, SAT, SUN)
    som_date = convert_str_to_date(start_of_month(whichdays=whichdays))
    print(convert_date_to_str(som_date, time_format='%m/%d/%Y') + ':00:00:00')
    (yy, mm, dd, mmm) = convert_date_format('20121207', to_format = '%Y-%m-%d-%b').split('-')
    print(yy, mm, dd, mmm)
    print(convert_date_format('20121207', to_format = '%Y%m01'))

    whichdays = (MON, TUE, WED, THU, FRI)
    print("next_month(20130710)=" + next_month('20130710'))
    print('next_month=' + next_month())
    print('next_month 20120617=' + next_month('20120617'))
    print("next_month(20120704)=" + next_month('20120704'))

    print(convert_xldate(41816.0)) # This is 6/26/2014
    print(convert_xldate(41851)) # This is 7/31/2014
    print(convert_date_to_str(convert_xldate(41851), '%Y-%m-%d'))
    
    print(expand_date_template('test_file_name{DD}{MM}{YYYY}{HR}{MIN}{SEC}', '20140626'))
    
    
