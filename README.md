# Bamazon 
### Written by: Anthony Napolitano 4/20/2018
Bamazon is made up of 2 node.js console application (bamazonCustomer and bamazonMaster) that communicates with a mysql database.


# Setup

1) Node setup up: this package requires mysql, dotenv, and inquirer to initialize simply
   run `node init` after cloning the repository from git hub.
2) You will need to run the schema.sql script directly into mysql workbench to create the
   database and populate the tables.
3) You will have to create a .env file and put your personal local mysql password in the file.
    DBPWD=`your local mysql password here`

# bamazonCustomer

To run bamazon as a customer. Open your console, or git to the directory you have cloned into and run: node bamazonCustomer

![startup bamazon](./bc1.gif "Start bamazonCustomer")

To buy a product follow these steps:

1) use the arrow keys to select a product from the list.
2) Hit enter to select the product you wish to buy.
3) Now you may select how many of that product you wish to buy; this must be a positive   number.
4) If you picked the wrong product just select 0 as your quantity.
5) After selecting a quantity bamazon will ask you if you wish to continue shopping. Y to continue or N to leave the program.

![purchase bamazon](./bc2.gif "Buy!")

# bamazonManager    


