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

# bamazonManager    


