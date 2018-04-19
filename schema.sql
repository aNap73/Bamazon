-- 1. Create a MySQL Database called `bamazon`.
CREATE DATABASE IF NOT EXISTS BAMAZON;

USE BAMAZON;
-- 2. Then create a Table inside of that database called `products`.


-- 3. The products table should have each of the following columns:

--    * item_id (unique id for each product)

--    * product_name (Name of product)

--    * department_name

--    * price (cost to customer)

--    * stock_quantity (how much of the product is available in stores)

CREATE TABLE PRODUCTS(
	ITEM_ID INTEGER NOT NULL AUTO_INCREMENT,
    PRODUCT_NAME VARCHAR(255) NOT NULL,
    DEPARTMENT_NAME VARCHAR(50) NULL,
    PRICE NUMERIC(10,2),
    STOCK_QUANTITY NUMERIC(10),
    primary key(ITEM_ID)    
);
-- 4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES('HUBSAN h123d FPV Quad Copter', 'Hobby', 169.99, 13);
INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES('Lego Batman Robot', 'Toys', 29.99, 8);
INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES('Super Power Brick 9000', 'Electronics', 75.99, 3);
INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES('Bamo Whamo Wacky Water Blaster', 'Toys', 9.99, 213);
INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES('Electro Light Finger Fidget Fighter', 'Toys', 11.99, 78);
INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES('Hot Head Electro Blow Dryer', 'Beauty', 59.99, 2);
INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES('Lux Delux Cotton Plush Vibro Bathrobe', 'Beauty', 199.99, 113);
INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES('Funkenwagnel Encyclopedia', 'Books', 1999.99, 2);
INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES('Martian Master Death Empire', 'Books', 5.99, 113);
INSERT INTO PRODUCTS (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES('9000 volt wood burning tool', 'Hobby', 73.98, 45);

Select Count(*)
 From Products;