DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE elitesheet;

USE elitesheet;

CREATE TABLE transactions(
  account_ID INT NOT NULL AUTO_INCREMENT,
  company_desc VARCHAR(100) NOT NULL,
  Invoice_ID INT NOT NULL,
  Item_ID INT NOT NULL,
  Vendor_item_ID INT NOT NULL,
  Credit_ID INT NOT NULL,
  Debit_ID INT NOT NULL,
  Total_Balance DECIMAL(10,0) NOT NULL,
  Due_date DATETIME, 
  Past_due INT NULL COMMENT "1-30 days, 60+ days",
  Representative_name VARCHAR(30) NOT NULL,
  Department_name VARCHAR(30) NOT NULL,
  Location_name VARCHAR(30) NOT NULL,
  primary key(account_ID)
);

SELECT * FROM transactions;

INSERT INTO transactions (account_ID, company_desc, Invoice_ID, Item_ID, Vendor_item_ID)

VALUES;