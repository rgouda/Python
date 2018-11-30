# ------------------------------------------------------------------------------
# VCS Info: $Id$
#
# ------------------------------------------------------------------------------
from sqlalchemy import String, Integer, DateTime, SmallInteger, Numeric
from sqlalchemy import Table, Column, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import validates

import lib_dbutils as db
import lib_misc_utils as misc
import lib_ldenv as env

Base = declarative_base()
LogBase = declarative_base(metadata=MetaData(schema='log'))

log = misc.get_formatted_logger(name=__name__)
env.AppCfg.register('lhs_env')

class TblFileStatus(LogBase):
    __tablename__ = 'ftp_file_status'
    # __table_args__ = {"schema": "log"}

    id = Column(Integer, autoincrement=True, primary_key=True)
    tag_name = Column(String(25))
    linking_key = Column(Integer)
    file_name = Column(String(150))
    status = Column(String(25))                 # New/Pending, Loaded, Error
    error_text = Column(String(255))            # Descriptive message for failed to upload or otherwise.
    created_ts = Column(DateTime)
    updated_ts = Column(DateTime)

    def __repr__(self):
        return 'id={}, tag_name={}, file_name={}, status={}, error_text={}, created_ts={}'.\
            format(self.id, self.tag_name, self.file_name, self.status, self.error_text, self.created_ts)

class TblMagentoHeads(Base):
    __tablename__ = 'magento_heads'

    Order_Number = Column(Integer)
    Delivery_Complete = Column(String(10))
    Memo = Column(String(40))
    Order_Date = Column(DateTime)
    Cust_ID_Shop = Column(String(10))
    Cust_ID_Magento = Column(Integer)
    Birthday = Column(String(25))
    LHS_Biz_Ctry_Lang = Column(String(30))
    Addr_Type_Bill = Column(SmallInteger)
    Honorific_Bill = Column(String(10))
    Title_Bill = Column(String(10))
    First_Name_Bill = Column(String(30))
    Last_Name_Bill = Column(String(30))
    Company_Bill = Column(String(50))
    Company2_Bill = Column(String(50))
    Department_Bill = Column(String(50))
    User_ID = Column(String(10))
    Street_Bill = Column(String(50))
    House_Nr_Bill = Column(String(10))
    Addr_Suffix_Bill = Column(String(50))
    Zip_Code_Bill = Column(String(12))
    City_Bill = Column(String(50))
    Country_Code_Bill = Column(String(10))
    Phone_Bill = Column(String(30))
    Email_Bill = Column(String(50))
    Packing_Station = Column(String(10))
    Addr_Type_Ship = Column(String(10))
    Honorific_Ship = Column(String(10))
    Title_Ship = Column(String(10))
    First_Name_Ship = Column(String(20))
    Last_Name_Ship = Column(String(20))
    Company_Ship = Column(String(50))
    Company2_Ship = Column(String(40))
    Department_Ship = Column(String(20))
    Street_Ship = Column(String(60))
    House_Nr_Ship = Column(String(10))
    Addr_Suffix_Ship = Column(String(50))
    Zip_Code_Ship = Column(String(12))
    City_Ship = Column(String(30))
    Country_Code_Ship = Column(String(10))
    Phone_Ship = Column(String(20))
    Packing_Nr = Column(String(10))
    Sales_ID = Column(String(10))
    Ship_Cost = Column(Numeric(6, 2))
    Ship_Date = Column(DateTime)
    Ship_Type = Column(String(30))
    Currency_Code = Column(String(10))
    Coupon_Code = Column(String(20))
    Rebate_Type = Column(String(20))
    Rebate_Value = Column(Numeric(6,2))
    Rebate_Percent = Column(Numeric(5, 2))
    Payment_Type = Column(String(30))
    Paypal_Transaction_ID = Column(String(10))
    Bank_Name = Column(String(30))
    Account_Number = Column(String(20))
    IBAN = Column(String(20))
    BIC = Column(String(20))
    ABA = Column(String(20))
    Referrer_Code = Column(String(20))
    Referrer_Name = Column(String(20))
    Catalog = Column(String(20))
    Reference_Nr = Column(String(20))
    Reference_Nr_Type = Column(String(10))
    Invoice_In_Package = Column(String(10))
    batch_status = Column(String(10))
    fpi_b = Column(Integer)
    fpi_s = Column(Integer)
    id = Column(Integer, autoincrement=True, primary_key=True)
    State_Bill = Column(String(10))
    State_Ship = Column(String(50))
    Middle_Name_Bill = Column(String(30))
    Middle_Name_Ship = Column(String(30))

    def __repr__(self):
        return 'Order_Number={}, Memo={}'.format(self.Order_Number, self.Memo)

    @validates('Delivery_Complete', 'Memo', 'Cust_ID_Shop', 'Birthday', 'LHS_Biz_Ctry_Lang', 'Honorific_Bill',
      'Title_Bill', 'First_Name_Bill', 'Middle_Name_Bill', 'Last_Name_Bill', 'Company_Bill', 'Company2_Bill',
      'Department_Bill', 'User_ID', 'Street_Bill', 'House_Nr_Bill', 'Addr_Suffix_Bill', 'State_Bill', 'Zip_Code_Bill',
      'City_Bill', 'Country_Code_Bill', 'Phone_Bill', 'Email_Bill', 'Packing_Station', 'Addr_Type_Ship', 'Honorific_Ship', 'Title_Ship',
      'First_Name_Ship', 'Middle_Name_Ship', 'Last_Name_Ship', 'Company_Ship', 'Company2_Ship', 'Department_Ship', 'Street_Ship', 'House_Nr_Ship',
      'Addr_Suffix_Ship', 'State_Ship', 'Zip_Code_Ship', 'City_Ship', 'Country_Code_Ship', 'Phone_Ship',
      'Packing_Nr', 'Sales_ID', 'Ship_Type', 'Currency_Code', 'Coupon_Code', 'Rebate_Type', 'Payment_Type',
      'Paypal_Transaction_ID', 'Bank_Name', 'Account_Number', 'IBAN', 'BIC', 'ABA', 'Referrer_Code',
      'Referrer_Name', 'Catalog', 'Reference_Nr', 'Reference_Nr_Type', 'Invoice_In_Package') # Provide multiple separated columns.

    def truncate_data(self, key, value):
        max_len = getattr(self.__class__, key).prop.columns[0].type.length
        if value and len(value) > max_len:
            return value[:max_len]
        return value

class TblMagentoPosns(Base):
    __tablename__ = 'magento_positions'

    Order_Number = Column(Integer)
    Cust_ID_Shop = Column(String(10))
    Cust_ID_Magento = Column(Integer)
    LHS_Biz_Ctry_Lang = Column(String(30))
    ArtikelNr = Column(Integer)
    Quantity = Column(Integer)
    Price = Column(Numeric(6, 2))
    Item_Number = Column(SmallInteger)
    Packed = Column(String(10))
    Greeting_Card_Text = Column(String(10))
    Coupon_Code = Column(String(20))
    Item_Memo_1 = Column(String(10))
    Item_Memo_2 = Column(String(10))
    Print_Instructions = Column(String(10))
    Coupon_Rebate = Column(Numeric(6, 4))
    Availability_Date = Column(String(10))
    id = Column(Integer, autoincrement=True, primary_key=True)
    Rebate_3 = Column(Numeric(6, 4))
    batch_status = Column(SmallInteger)

    def __repr__(self):
        return 'Order_Number={}, Item_Number={}, Cust_ID_Shop={}'.format(self.Order_Number, self.Item_Number, self.Cust_ID_Shop)

    @validates( 'Cust_ID_Shop', 'LHS_Biz_Ctry_Lang', 'Packed', 'Greeting_Card_Text', 'Coupon_Code',
                'Item_Memo_1', 'Item_Memo_2', 'Print_Instructions', 'Availability_Date')
                
    def truncate_data(self, key, value):
        max_len = getattr(self.__class__, key).prop.columns[0].type.length
        if value and len(value) > max_len:
            return value[:max_len]
        return value

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, autoincrement=True, primary_key=True)
    username = Column(String(32))
    password_hash = Column(String(120), index=True)
    created_ts = Column(DateTime)
    is_active = Column(SmallInteger)

    def __repr__(self):
        return 'id={}, username={}, password_hash={}, created_ts={}, is_active={}'.\
            format(self.id, self.username, self.created_ts, self.is_active)

if __name__ == "__main__":
    # Provide options to create above tables.
    engine = db.database_factory().engine
    # Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
