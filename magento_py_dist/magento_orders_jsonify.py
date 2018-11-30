# ------------------------------------------------------------------------------
# VCS Info: $Id$
#
# ------------------------------------------------------------------------------
import arrow
from collections import defaultdict, OrderedDict
from datetime import datetime
from decimal import Decimal
import json
from sqlalchemy.schema import MetaData, Table
from sqlalchemy import ForeignKey, Column, Integer, between
# Define all Microservice APIs here
from nameko.rpc import rpc

import lib_dbutils as db
import lib_misc_utils as misc
import lib_ldenv as env

log = misc.get_formatted_logger(name=__name__)
env.AppCfg.register('lhs_env')


class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        """Handling of datetime for serializing date."""
        if isinstance(obj, datetime):
            return obj.isoformat().replace('T', ' ')
        elif isinstance(obj, Decimal):
            return float(obj)

        return json.JSONEncoder.default(self, obj)


# Not used anymore.
def jsonify(results):
    l = []
    fields = None
    if isinstance(results, list):
        for r in results:
            if not fields:
                fields = sorted(r._fields)
            d = {f: getattr(r, f) for f in fields}
            l.append(d)
    else:
        l = results

    return json.dumps(l, cls=JSONEncoder, indent=4, sort_keys=True)


class MagentoDBProcessor():
    def __init__(self):
        self.session = db.database_factory(echo=False).session
        self.meta = MetaData(bind=self.session.get_bind())
        self.magento_heads_tbl = Table('v_magento_orders', self.meta, Column('Order_Number', Integer, primary_key=True),
                                       autoload=True)
        self.magento_posns_tbl = Table('v_magento_ord_dtl', self.meta,
                                       Column('Order_Number', Integer, ForeignKey('v_magento_orders.Order_Number')),
                                       autoload=True)
        self.customer_tbl = Table('v_customers_shop', self.meta,
                                  Column('Cust_ID_Magento', Integer, primary_key=True),
                                  autoload=True)

    def fetch_magento_orders_combined(self, start_date, end_date, order_detls_only=False):
        """Returns Magento orders with their associative details and customer name details. Used for
    master/detail view."""

        order_heads = self.magento_heads_tbl
        order_posns = self.magento_posns_tbl
        #        order_heads = Table('v_magento_orders', self.meta, Column('Order_Number', Integer, primary_key=True),
        #                             autoload=True)
        #        order_posns = Table('v_magento_ord_dtl', self.meta,
        #                            Column('Order_Number', Integer, ForeignKey('order_heads.Order_Number')),
        #                            autoload=True)

        orders = self.session.query(order_heads.c.Order_Number, order_heads.c.Order_Date). \
            filter(between(order_heads.c.Order_Date, start_date, end_date))
        orders_subq = orders.subquery()

        cust_detail = self.session.query(order_heads.c.Order_Number,
                                         order_heads.c.Full_Name_Bill, order_heads.c.Email_Bill). \
            filter(orders_subq.c.Order_Number == order_heads.c.Order_Number).all()
        cust_dict = db.Database.sql_rows_to_dict(cust_detail, keys=['Order_Number'])

        order_details = self.session.query(order_posns). \
            filter(order_posns.c.Order_Number == orders_subq.c.Order_Number). \
            all()
        order_details_dict = db.Database.sql_rows_to_dict(order_details, keys=['Order_Number'])

        ord_dict = db.Database.sql_rows_to_dict(orders.all(), keys=['Order_Number'])

        order_list = list()
        for k, order in ord_dict.items():
            if order_detls_only:
                [order_list.append({'OrderDetails': v}) for v in order_details_dict[k]]
            else:
                row = OrderedDict([('Order', order[0]),
                                   ('Cust', cust_dict[k][0]),
                                   ('OrderDetails', order_details_dict[k])])
                order_list.append(row)

        return order_list

    def fetch_magento_orders(self, start_date, end_date, order_detls_only=False):
        """Returns a list of orders only. It will return all columns. Used for showing only orders."""
        session = db.database_factory(echo=False).session
        meta = MetaData(bind=session.get_bind())

        order_heads = self.magento_heads_tbl
        orders = session.query(order_heads). \
            filter(between(order_heads.c.Order_Date, start_date, end_date)).all()
        orders = [o._asdict() for o in orders]

        return orders

    def fetch_magento_order_details(self, start_date, end_date):
        """Returns columns of order details."""
        order_heads = self.magento_heads_tbl
        orders = self.session.query(order_heads.c.Order_Number, order_heads.c.Order_Date). \
            filter(between(order_heads.c.Order_Date, start_date, end_date))
        orders_subq = orders.subquery()

        order_posns = self.magento_posns_tbl
        order_detls = self.session.query(order_posns). \
            filter(order_posns.c.Order_Number == orders_subq.c.Order_Number). \
            all()
        order_detls = [od._asdict() for od in order_detls]

        return order_detls

    def fetch_customer_list(self, from_cust_id, to_cust_id):
        """Returns list of customers in database for the given date range."""
        customer = self.customer_tbl
        customers = self.session.query(customer). \
            filter(between(customer.c.Cust_ID_Magento, from_cust_id, to_cust_id)). \
            all()
        customers = [c._asdict() for c in customers]
        return customers

    def search_customers(self, col_name, col_value):
        """Returns a list of customers based on search criteria provided."""
        customer = self.customer_tbl
        # TODO: Use col_name dynamically
        customers = self.session.query(customer).filter(customer.c[col_name].like(col_value)).all()
        return customers

    def delete_customers(self, id_list):
        """Remove customer records from database for the list of provided primary keys"""
        customer = self.customer_tbl
        cust = self.session.query(customer).filter(customer.c.Cust_ID_Magento.in_(id_list)).all()
        self.session.delete(cust)
        self.session.commit()

    def update_customer(self, row):
        """Insert or update customer row in DB table"""
        customer = self.search_customers('Cust_ID_Magento', row['Cust_ID_Magento'])

        for col_name, col_value in customer.__dict__:
            attribute = customer.c.getattr(col_name, '')
            attribute = col_value
        self.session.flush()
        self.session.commit()


class MagentoOrders(object):
    name = 'magentoorders'

    def __init__(self):
        self.db_processor = MagentoDBProcessor()

    @staticmethod
    def assign_defaults(start_date, end_date):
        now = arrow.Arrow.now()
        if not start_date:
            start_date = now.replace(months=-12)
        elif isinstance(start_date, str):
            start_date = arrow.get(start_date, 'YYYY-MM-DD')

        if not end_date:
            end_date = now
        elif isinstance(end_date, str):
            end_date = arrow.get(end_date, 'YYYY-MM-DD')

        # Assign their beginning and end of day timestamps.
        if isinstance(start_date, arrow.Arrow):
            start_date = start_date.span('day')[0].datetime

        if isinstance(end_date, arrow.Arrow):
            end_date = end_date.span('day')[1].datetime

        return start_date, end_date

    @rpc
    def get_magento_order_details_combined(self, start_date=None, end_date=None):
        log.debug('Processing magento order details combined')
        start_date, end_date = MagentoOrders.assign_defaults(start_date, end_date)
        results = json.dumps(self.db_processor.fetch_magento_orders_combined(start_date, end_date), cls=JSONEncoder,
                             sort_keys=False)
        log.debug('...done')

        return results

    @rpc
    def get_magento_orders(self, start_date=None, end_date=None):
        log.debug('Processing magento orders')
        start_date, end_date = MagentoOrders.assign_defaults(start_date, end_date)
        results = json.dumps(self.db_processor.fetch_magento_orders(start_date, end_date), cls=JSONEncoder,
                             sort_keys=False)
        log.debug('...done')

        return results

    @rpc
    def get_magento_order_details(self, start_date=None, end_date=None):
        log.debug('Processing magento order details')
        start_date, end_date = MagentoOrders.assign_defaults(start_date, end_date)
        results = json.dumps(self.db_processor.fetch_magento_order_details(start_date, end_date), cls=JSONEncoder,
                             sort_keys=False)
        log.debug('...done')
        return results


class Customers(object):
    name = 'customers'

    def __init__(self):
        self.db_processor = MagentoDBProcessor()

    @rpc
    def get_customer_list(self, from_cust_id=None, to_cust_id=None):
        log.debug('Retrieving customer list')
        results = json.dumps(self.db_processor.fetch_customer_list(from_cust_id, to_cust_id), cls=JSONEncoder,
                             sort_keys=False)
        log.debug('...done')
        return results

    @rpc
    def search_customers_by_criteria(self, filter_col_name, filter_col_value):
        log.debug('Searching customers by given criteria')
        results = json.dumps(self.db_processor.search_customers(filter_col_name, filter_col_value),
                             cls=JSONEncoder, sort_keys=False)
        log.debug('...done')
        return results

    @rpc
    def update_customer(self, row):
        log.debug('Insert/Update customer record')
        # TODO: Implement this once customer id table is known.
        self.db_processor.update_customer(row)

    @rpc
    def delete_customers(self, ids):
        log.debug('Deleting customer:' + str(ids))
        # TODO: To be implemented once the customer table is known.
        self.db_processor.delete_customers(ids)


if __name__ == "__main__":
    # start_date, end_date = datetime.strptime('2016-01-01', '%Y-%m-%d'), datetime.today()
    # path = '/Users/rgouda/workspace/side_gig/Sync/Gouda_Sameer_Share/Active_Projects/CRUD_Forms/site/data'
    # with open(path + '/magento_orders2.json', 'w+') as f:
    #     f.write(json.dumps(fetch_magento_orders(start_date, end_date), cls=JSONEncoder, indent=2, sort_keys=False))
    #
    # with open(path + '/magento_order_details.json', 'w+') as f:
    #     f.write(json.dumps(fetch_magento_orders(start_date, end_date, order_detls_only=True), cls=JSONEncoder,
    #                        indent=2, sort_keys=False))

    # start_date = arrow.Arrow(arrow.Arrow.now().year, 1, 1).datetime
    # end_date = arrow.Arrow.now().datetime
    # m = MagentoOrders()
    # print('get_magento_order_details_combined', m.get_magento_order_details_combined('2016-09-29', '2016-10-03'))
    # print('get_magento_orders', m.get_magento_orders('2016-09-29', '2016-10-03'))
    # print('get_magento_order_details', m.get_magento_order_details())

    # print(json.dumps(fetch_magento_orders(start_date=start_date, end_date=end_date),
    #                  cls=JSONEncoder, indent=2, sort_keys=False))

    c = Customers()
    # cust_list = c.get_customer_list(0, 99)
    cust_list = c.search_customers_by_criteria('Cust_ID_Magento', '18799')
    print('# of customers=', len(cust_list))  # Prints the length of JSON.
    print('cust_list=', cust_list)

    cust_list = c.search_customers_by_criteria('Cust_Name_Bill', 'Sharygin%')
    print('# of customers=', len(cust_list))  # Prints the length of JSON.
    print('cust_list=', cust_list)
