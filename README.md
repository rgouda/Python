# Python

# For starting microservices...
d:  
set PYTHONPATH=.;D:\Active_Projects\common  
cd D:\Active_Projects\LHS\src  
nameko run service_login --broker amqp://mq_user:******@GoudaWin10  
nameko run magento_orders_jsonify --broker amqp://mq_user:*****@GoudaWin10  

# For starting REST API layer  
python REST_api.py  

# On MQ one time enabling is required  
cd c:\Softwares\RabbitMQServer\rabbitmq_server-3.6.6\sbin\  
rabbitmq-plugins enable rabbitmq_management  
After starting default user name password is guest/*****  

tail -f /cygdrive/c/Users/winuser/AppData/Roaming/RabbitMQ/log/rabbit*Win10.log  
tail -f /cygdrive/c/Softwares/nginx/logs/access.log  
tail -f /cygdrive/c/temp/  
ps | grep nginx  
nginx -s reload  
nginx -s quit  
nginx --help  

# Quick tests with CURL command to check the service is running.  
curl -X GET -H "Content-Type: application/json" http://GoudaWin10:5050/magento_order_details/ -d '{"start_date":"2016-09-29", "end_date":"2016-09-29"}'  
curl -X POST -H "Content-Type: application/json" https://GoudaWin10:5050/verify_login -d '{"username":"test", "password":"*****"}'  
curl -X GET -H "Content-Type: application/json" http://GoudaWin10:5050/customer_list/ -d '{"from_id":0, "to_id":99999999}'  
curl -X GET -H "Content-Type: application/json" http://GoudaWin10:5050/customer_list/ -d '{"from_id":0, "to_id":99999999}'  
curl -X GET -H "Content-Type: application/json" http://GoudaWin10:5050/customer_list/0/999999  

# Quick links to test, in web browser, the site is returning data.  
http://GoudaWin10:5050/magento_orders/2017-01-03/2017-01-04  
http://localhost:5000/magento_orders/2017-01-03/2017-01-04  
http://GoudaWin10:5050/magento_order_details/?start_date=2016-09-29&end_date=2016-10-03  
http://GoudaWin10:5050/magento_order_details_combined/  
  
'TODO Some hash string here to make it more secure.'  
curl -X POST -H "Content-Type: application/json" http://GoudaWin10:5050/verify_login -d '{"id": 1, "user": "test", "password":"****"}'  
# To test with access token  
curl -X POST -H "Content-Type: application/json" http://GoudaWin10:5050/verify_login -d '{"id": 1, "user":  "eyJhbGciOiJIUzI1NiIsImlhdCI6MTQ4OTU5NjU1OSwiZXhwIjoxNDg5NTk3MTU5fQ.eyJpZCI6MX0.Ns41ZfGcd0LB9Jl20jz65lwt-BkVUEwRttJacwGw31o"}'  
