# Bamazon 
### Written by: Anthony Napolitano 4/23/2018
Bamazon is made up of 2 node.js console applications (bamazonCustomer and bamazonMaster) that communicate with a mysql database.

# Setup

1) This package will require mysql, dotenv, and inquirer to run, so we must,
   run `npm i` after cloning the repository from git hub. In a cmd prompt or console run:
   
   ##### git clone git@github.com:aNap73/Bamazon.git
   ##### cd Bamazon
   ##### npm i
    
2) You will need to run the schema.sql script directly into mysql workbench to create the
   database and populate the tables.  I will not try to explain this step as it is beyond the scope of this document.

3) You will have to create a .env file and put your personal local mysql password in the file.
   ##### DBPWD=`your local mysql password here`

4) If you are lost here. I feel your pain. I have provided some animated gif's below.

5) If you are up and running. I salute you!     

# bamazonCustomer

To run bamazon as a customer. Open your console, or git to the directory you have cloned into and run: node bamazonCustomer

![startup bamazon](./bc1.gif "Start bamazonCustomer")

To buy a product follow these steps:

1) Use the arrow keys to select a product from the list.
2) Hit enter to select the product you wish to buy from the list.
3) Now enter how much you wish to buy of your selected product.
4) If you picked the wrong product just select 0 as your quantity. 
5) After selecting a quantity bamazon will ask you if you wish to continue shopping. Y to continue or N to leave the program.

![purchase bamazon](./bc2.gif "Buy!")

# bamazonManager    

To run bamazon as a manager. Open your console, to it's path, and run: node bamazonManager

![manage bamazon](./bm1.gif "Start bamazonManagaer")

In management mode you have 5 options:

1) You can Refresh the Inventory View
2) You can View Low Inventory (quantity < 5)
3) You can Add Inventory
4) You can add a new product
5) You can exit bamazonManager

### Refresh Inventory View / View Low Inventory

Refreshing the Inventory View will relist all the inventory from the database. 

Viewing low inventory, filters the inventory to only those products with less than 5 on hand.

![manager views](./bm2.gif "View bamazonManagaer")

### Add Inventory

You may add inventory at anytime in bamazonManager.
First, Select either the full list of products with the `Refresh Inventory View` 
or select a partial view of the inventory list with `View Low Inventory`.

Select from this list the product you wish to replenish.
Now input the quantity you wish to add to stock.

Below see a manager checking his low inventory view, and then adding items to bring his on hand items for all products above qty of 5.

![manager receive](./bm3.gif "Receive bamazonManagaer")

### Add a new Product

You may also add new products to the offerings at bamazon. To accomplish this simply select `Add a product` from the managers menu.

You will be asked to name the product, select a department or category, give it a price and select an inital quantity on hand.

![manager new product](./bm4.gif "New product bamazonManagaer")

enjoy bamazon!

