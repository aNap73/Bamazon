
// * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

// * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

// * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

// * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.


var inq = require('inquirer');
var mysql = require('mysql');
var linelen = 0;
var items4sale = [];
var itemPrices = [];
require("dotenv").config();
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: process.env.dbpwd,
  database: "bamazon"
});

function startup(bLow) {
  items4sale.length = 0;
  itemPrices.length = 0;
  let sql = 'Select * from products';
  if (bLow) {
    sql = 'Select * from products where STOCK_QUANTITY < 5';
  }

  let bHeader = false;
  connection.query(sql, function (err, res) {
    if (err) { console.log(err); return end; }
    for (var obj in res) {
      let val = Object.values(res[obj]);
      let key = Object.keys(res[obj]);
      let header = '';
      let line = '';
      if (!bHeader) {
        header += align(key[0], 7) + ' | ';
        header += align(key[1], 40) + ' | ';
        header += align(key[2], 20) + ' | ';
        header += align(key[3], 10) + ' | ';
        header += align(key[4], 10) + ' | ';
        console.clear();
        console.log('---------------------------------------------------------------------------------------------------------');
        console.log('---------------------$$$MANAGE BAMAZON CAUSE WE REALLY WANT THEIR MONEY; ALOT$$$-------------------------');
        console.log('---------------------------------------------------------------------------------------------------------');

        console.log(header);
        console.log('---------------------------------------------------------------------------------------------------------');
        console.log('');
        bHeader = true;
      }
      line += align(val[0], 7) + '   ';
      line += align(val[1], 40) + '   ';
      items4sale.push(val[0] + '. ' + val[1]);
      itemPrices.push(val[3]);
      line += align(val[2], 20) + '   ';
      line += align(val[3], 10) + '   ';
      line += align(val[4], 10) + '   ';
      console.log(line);


    }
    console.log('');
    return getFunction();
  })
}
function getFunction() {
  let ProductId = '';
  let Quantity = 0;

  inq.prompt([{
    name: 'act',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['Refresh Inventory View', 'View Low Inventory', 'Add to Inventory', 'Add new Product', 'Exit']
  }]).then(function (ans) {
    switch (ans.act) {
      case 'Refresh Inventory View':
        return startup();
        break;
      case 'View Low Inventory':
        return startup(true);
        break;
      case 'Add to Inventory':
        return addInventory();
        break;
      case 'Add new Product':
        return addProduct();
    
        break;
      default:
        console.log('Have a great day!');
        return end();
    }
  });
}
function addProduct(){
// PRODUCT_NAME (val length)
// DEPARTMENT_NAME (val length)
// PRICE (val numeric, range)
// STOCK_QUANTITY (val numeric, range)

inq.prompt([{
  name: 'name',
  type: 'input',
  message: 'What is the new products name?'
  },
  {
    name: 'dept',
    type: 'list',
    message: 'What is the new products department?',
    choices:['Books','Movies','Music','Hobby','Toys','Electronics','Beauty','Food','Clothing','Furnature','Misc']
  },
  {
    name: 'prc',
    type: 'input',
    message: 'What is the new products price?',
    validate: function(input){
      if(isNaN(input)||input.length<1){return 'Price must be a number.'};      
      return true;
    }
  },
  {
    name: 'qty',
    type: 'input',
    message: 'How many do we have to stock?',
    validate: function(input){
      if(isNaN(input)||input.length<1){return 'Quantity must be a number.'};      
      return true;
    }
  }]).then(function (ans) {
      console.log(ans.name, ans.dept, ans.prc, ans.qty);
      let ins = 'INSERT INTO Products (PRODUCT_NAME, DEPARTMENT_NAME, PRICE, STOCK_QUANTITY) VALUES (?,?,?,?)'
      connection.query(ins, [ans.name,ans.dept,ans.prc,ans.qty], function (err, res) {
      if (err) { console.log(err); return end; }
      return startup();
    });
      });
}
function addInventory() {
  let ProductId = '';
  let Quantity = 0;
  if (items4sale.length < 1){return startup()};
  inq.prompt([{
    name: 'itm',
    type: 'list',
    message: 'What product would you like to stock?',
    choices: items4sale
  }, {
    name: 'qty',
    type: 'input',
    message: 'How many would you like to stock?',
    validate: function (input) {
      if (isNaN(input) || input.length < 1) { return 'Quantity must be a number.' };
      return true;
    }
  }
  ]).then(function (ans) {
  
    ProductId = ans.itm.slice(0, String(ans.itm).indexOf('.'));
    Quantity = ans.qty;
    let upd = 'UPDATE Products set STOCK_QUANTITY = STOCK_QUANTITY + ? WHERE ITEM_ID = ?'
    connection.query(upd, [Quantity, ProductId], function (err, res) {
      if (err) { console.log(err); return end; }
      return startup();
    });
  });  
}
function end() {
  connection.end();
  return;
}
function align(val, size) {
  val = String(val).padStart(size / 2);
  val = String(val).padEnd(size);
  return val;
}
startup();

