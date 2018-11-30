from distutils.core import setup

"""External libraries required:
SQLAlchemy==1.0.15
paramiko==2.0.2
pyodbc==3.1.1
"""
import py2exe

setup(
    name='LHS',
    version='1.0',
    package_dir={'': 'src'},
    url='',
    license='',
    author='apple',
    author_email='',
    description='',
    console=[
        'src\db_schema_magento.py', 'src\sync_ftp_files.py', 'src\load_magento_orders.py',
        'src\send_magento_files.py',
    ],
    requires=['arrow']
)