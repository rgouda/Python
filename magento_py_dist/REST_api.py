from flask import Flask, request, jsonify, Response
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS

from flasgger import Swagger
from nameko.standalone.rpc import ClusterRpcProxy

import lib_ldenv as env
from lib_misc_utils import get_formatted_logger

env.AppCfg.register('lhs_env')
cfg = env.get_config_object()
app = Flask(__name__)
Swagger(app)
CORS(app)       # For cross domain request
CONFIG = {'AMQP_URI': cfg.RABBITMQ_BROKER_URI}
log = get_formatted_logger(name=__name__)

auth = HTTPBasicAuth()

# Accepts multiple URL formats
@app.route('/magento_orders/<string:start_date>/<string:end_date>', methods=['GET'])
@app.route('/magento_orders/<string:start_date>/', defaults={'end_date': None}, methods=['GET'])
@app.route('/magento_orders/', defaults={'start_date': None, 'end_date': None}, methods=['GET'])
def magento_orders(start_date, end_date):
    # NOTE: Below YAML is required for Flasgger.
    """
    Micro Service to get the list of magento_orders.
    This API is made with Flask, Flasgger and Nameko
    ---
    parameters:
      - name: body
        in: body
        required: false
        description: Provide Start/end date in YYYY-MM-DD format
        schema:
          id: data
          properties:
            start_date:
              type: date
            end_date:
              type: date
    responses:
      200:
        description: Please wait while your client name is identified by the server. If identified it \
         will post back client details and the last id posted.
    """
    log.debug('-------------------------------------------')
    log.debug('Magento orders request processing')
    with ClusterRpcProxy(CONFIG) as rpc:
        status_code = 200
        try:
            start_date, end_date = parse_dates(request, start_date, end_date)
            rpc_reply = rpc.magentoorders.get_magento_orders.call_async(start_date, end_date)
            data = rpc_reply.result()
        except Exception as e:
            log.debug('Threw exception: ' + str(e))
            data, status_code = str(e), 500

        log.debug('...done')
        return data, status_code


@app.route('/magento_order_details/<string:start_date>/<string:end_date>', methods=['GET'])
@app.route('/magento_order_details/<string:start_date>/', defaults={'end_date': None}, methods=['GET'])
@app.route('/magento_order_details/', defaults={'start_date': None, 'end_date': None}, methods=['GET'])
def magento_order_details(start_date, end_date):
    """
    A REST API to get the list of magento order details.
    This YAML is a doclet for Flasgger.
    ---
    parameters:
      - name: body
        in: body
        required: false
        description: Provide Start/end date in YYYY-MM-DD format
        schema:
          id: data
          properties:
            start_date:
              type: date
            end_date:
              type: date
    responses:
      200:
        description: Returns a list of order details for a date range requested.
    """
    log.debug('-------------------------------------------')
    log.debug('Magento order details request processing')
    with ClusterRpcProxy(CONFIG) as rpc:
        status_code = 200
        try:
            start_date, end_date = parse_dates(request, start_date, end_date)
            rpc_reply = rpc.magentoorders.get_magento_order_details.call_async(start_date, end_date)
            data = rpc_reply.result()
        except Exception() as e:
            data, status_code = str(e), 500

        log.debug('...done')
        return data, status_code


# Accepts multiple URL formats
@app.route('/magento_order_details_combined/<string:start_date>/<string:end_date>', methods=['GET'])
@app.route('/magento_order_details_combined/<string:start_date>/', defaults={'end_date': None}, methods=['GET'])
@app.route('/magento_order_details_combined/', defaults={'start_date': None, 'end_date': None}, methods=['GET'])
def magento_order_details_combined(start_date, end_date):
    # NOTE: Below YAML is required for Flasgger.
    """
    Micro Service to get the list of magento_orders.
    This API is made with Flask, Flasgger and Nameko
    ---
    parameters:
      - name: body
        in: body
        required: false
        description: Provide Start/end date in YYYY-MM-DD format
        schema:
          id: data
          properties:
            start_date:
              type: date
            end_date:
              type: date
    responses:
      200:
        description: Please wait while your client name is identified by the server. If identified it \
         will post back client details and the last id posted.
    """
    with ClusterRpcProxy(CONFIG) as rpc:
        status_code = 200
        try:
            start_date, end_date = parse_dates(request, start_date, end_date)
            rpc_reply = rpc.magentoorders.get_magento_order_details_combined.call_async(start_date, end_date)
            data = rpc_reply.result()
        except Exception as e:
            data, status_code = str(e), 500

        return data, status_code


@app.route('/verify_login', defaults={'user': None, 'password': None}, methods=['POST'])
@auth.verify_password       # Used on methods that have decorator @auth.login_required
def verify_login(user, password):
  """ 
  An API to validate login/password. Password is optional if user is a token.
  ---
  parameters:
    - name: body
      in: body
      required true
      description: Enter your user name / password to verify you are legit.
      scehma:
        id: data
        properties:
          user:
            type: string
          password:
            type: string
  responses:
    200:
      description: Validates if the login is legit.
  """
  with ClusterRpcProxy(CONFIG) as rpc:
    status_code = 200
    try:
      log.debug(request)
      log.debug('user='+str(user) + ' ;password='+str(password))
      user = fetch_arg_from_url(request, 'user', user)
      password = fetch_arg_from_url(request, 'password', password)
      log.debug('user='+str(user) + ' ;password='+str(password))
      rpc_reply = rpc.login.verify_login.call_async(user, password)
      data = rpc_reply.result()
    except Exception as e:
      data, status_code = str(e), 500
      raise
  return data, status_code


# Accepts multiple URL formats
@app.route('/customer_list/<int:from_id>/<int:to_id>', methods=['GET'])
@app.route('/customer_list/<int:from_id>/', defaults={'to_id': None}, methods=['GET'])
@app.route('/customer_list/', defaults={'from_id': None, 'to_id': None}, methods=['GET'])
def customer_list(from_id, to_id):
  # NOTE: Below YAML is required for Flasgger.
  """
  Micro Service to get the list of customer_list.
  This API is made with Flask, Flasgger and Nameko
  The API could be used to get a customer record, list of customers for a given range of customer ids.
  The input parameters specified in URL can be in URL or in json payload.
  ---
  parameters:
    - name: body
      in: body
      required: false
      description: Provide Start/end date in YYYY-MM-DD format
      schema:
        id: data
        properties:
          from_id:
            type: int
          to_id:
            type: int
  responses:
    200:
      description: Please wait while your client name is identified by the server. If identified it \
       will post back client details and the last id posted.
  """
  log.debug('-------------------------------------------')
  log.debug('Customer List request processing')
  with ClusterRpcProxy(CONFIG) as rpc:
    status_code = 200
    try:
      from_cust_id = fetch_arg_from_url(request, 'from_id', from_id)
      to_cust_id = fetch_arg_from_url(request, 'to_id', to_id)
      rpc_reply = rpc.customers.get_customer_list.call_async(from_cust_id, to_cust_id)
      data = rpc_reply.result()
    except Exception as e:
      log.debug('Threw exception: ' + str(e))
      data, status_code = str(e), 500

  log.debug('...done')
  return data, status_code


@app.route('/search_customers/<string:col_name>/<string:col_value>', methods=['GET'])
@app.route('/search_customers/', defaults={'col_name':None, 'col_value':None}, methods=['GET'])
def search_customers(col_name=None, col_value=None):
  """To get list of customers by search criteria.
  ---
  parameters:
    - name: body
      in: body
      required: false
      description: Provide for example col_name="customer_name" and col_value="like 'James%'"
      schema:
        id: data
        properties:
          col_name:
            type: string
          col_value:
            type: string
  responses:
    200:
      description: Please wait while your customer criteria is being searched, the results will be returned momentarily.
      """
  log.debug('-------------------------------------------')
  log.debug('Customer List request processing (using search_customers api)')
  with ClusterRpcProxy(CONFIG) as rpc:
    status_code = 200
    try:
      filter_col_name = fetch_arg_from_url(request, 'col_name', None)
      filter_col_value = fetch_arg_from_url(request, 'col_value', None)
      rpc_reply = rpc.customers.search_customers.call_async(filter_col_name, filter_col_value)
      data = rpc_reply.result()
    except Exception as e:
      log.debug('Throw exception: ' + str(e))
      data, status_code = str(e), 500

    log.debug('...done')
    return data, status_code


@app.route('/customer_delete/<string:ids>', methods=['DELETE'])
def delete_customers(ids=None):
  log.debug('-------------------------------------------')
  log.debug('Customer delete step is running')
  if isinstance(ids, str):
    ids = ids.split(',')
    
  with ClusterRpcProxy(CONFIG) as rpc:
    status_code = 200
    try:
      rpc_reply = rpc.customers.delete_customers.call_async(id)
      data = rpc_reply.result()
    except Exception as e:
      log.debug('Throw exception')
      data, status_code = str(e), 500
      
    log.debu('...done')
    return data, status_code


@app.route('/update_customer/', methods=['PUT'])
def update_customer():
  log.debug('-------------------------------------------')
  log.debug('Customer update step is running')
  with ClusterRpcProxy(CONFIG) as rpc:
    status_code = 200
    try:
      row = fetch_arg_from_url(request, 'row', [])
      rpc_reply = rpc.customers.update_customer.call_async(row)
      data = rpc_reply.result()
    except Exception as e:
      log.debug('Throw exception')
      data, status_code = str(e), 500
      
    log.debug('...done')
    return data, status_code
    

def fetch_arg_from_url(request, argname, default=''):
  ''' A convenient wrapper to parse argument from URL or from JSON payload.'''
  try:
#    this block is for experimental purpose only.
    try:
      payload_data = None
      payload_data = getattr(request, 'get_data', None)
    except:
      pass
    print('payload_data='+str(payload_data))

    ret_val = default
    json = request.get_json(force=True, silent=True)
    log.debug('---------------')
    if request.is_json and json:
      ret_val = request.json.get(argname, ret_val)
    
    if not ret_val:
      #NOTE: Values in request.args are of string data type. They need to be converted by downstream end points.
      ret_val = request.args.get(argname, ret_val)
      
    log.debug(f'{argname} = {ret_val}, ret_val type={type(ret_val)}, is_json={request.is_json}, args={request.args}')
    return ret_val
  except:
    log.debug('Threw exception while parsing ' + argname)
    

def parse_dates(request, start_date, end_date):
  """Helper function to retrieve dates
  
  Usage types:  
  # 1. For handling position based arguments
   curl -X GET "http://december08Win10:5050/magento_orders/2016-10-01/2016-10-03"
  
  # 2. For handling Json data in request
  # Curl json data works but Flask fails to payload Ajax call.
  curl -X GET -H "Content-Type: application/json" http://december08Win10:5050/magento_orders/ -d '{"start_date":"2017-03-05", "end_date":"2017-03-05"}'
  
  # A request argument request.
  curl -X GET "http://december08Win10:5050/magento_orders/?start_date=2017-03-05&end_date=2017-03-05"
  """
  try:
    save_start_date, save_end_date = start_date, end_date
    
    # Flask payload does not work when the Json data is received from Ajax call.
    start_date = end_date = None
    
    try:
      payload_data = None
      payload_data = getattr(request, 'get_data', None)
    except:
      pass
    print('payload_data='+str(payload_data))
    
    # For pattern /?{start_date:.., end_date:...}
    json_data = request.get_json(force=True, silent=True)
    if request.is_json and json_data:
      start_date = request.json.get('start_date', None)
      end_date = request.json.get('end_date', None)
      
    # For patterns /?start_date=..&end_date=...
    start_date = request.args.get('start_date', start_date)
    end_date = request.args.get('end_date', end_date)
    
  except Exception as e:
    log.debug('Threw exception while parsing dates\n' + str(e))
  
  # if arguments already had good value use them instead.
  if save_start_date:
    start_date = save_start_date
    
  if save_end_date:
    end_date = save_end_date

  if start_date and end_date and start_date > end_date:
    start_date, end_date = end_date, start_date
    
  log.debug(f'start_date={start_date}')
  log.debug(f'end_date={end_date}')
  
  return start_date, end_date


class InvalidUsage(Exception):
  status_code = 400

  def __init__(self, message, status_code=None, payload=None):
    Exception.__init__(self)
    self.message = message
    if status_code is not None:
      self.status_code = status_code
    self.payload = payload

  def to_dict(self):
    rv = dict(self.payload or ())
    rv['message'] = self.message
    return rv


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
  response = jsonify(error.to_dict())
  response.status_code = error.status_code
  return response


app.run(debug=False, threaded=True)