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

function startup() {
 items4sale.length=0;
 itemPrices.length=0;
 let sql = 'Select * from products where STOCK_QUANTITY > 0';
 let bHeader = false;
 connection.query(sql,function(err,res){
  if(err){console.log(err); return end;}
  for (var obj in res){
   let val  = Object.values(res[obj]);
   let key  = Object.keys(res[obj]);
   let header = '';
   let line = '';
   if(!bHeader){
    header += align(key[0],7) + ' | ';
    header += align(key[1],40) + ' | ';
    header += align(key[2],20) + ' | ';
    header += align(key[3],10) + ' | ';
    header += align(key[4],10) + ' | ';
    console.clear();
    console.log('---------------------------------------------------------------------------------------------------------');
    console.log('---------------------$$$SHOP BAMAZON CAUSE WE REALLY WANT YOUR MONEY; ALOT$$$----------------------------');
    console.log('---------------------------------------------------------------------------------------------------------');
    
    console.log(header);
    console.log('---------------------------------------------------------------------------------------------------------');
    
    bHeader = true;
   }
   line += align(val[0],7) + '   ';
   line += align(val[1],40) + '   ';
   items4sale.push(val[0] + '. ' + val[1]);
   itemPrices.push(val[3]);
   line += align(val[2],20) + '   ';
   line += align(val[3],10) + '   ';
   line += align(val[4],10) + '   ';   
   console.log(line);
  }
  console.log('');
  return getSale();
 });
 
}
function getSale(){
  let ProductId = '';
  let Quantity = 0;
  
  inq.prompt([{
      name: 'id',
      type: 'list',
      message: 'Which item do you wish to purchase?',
      choices: items4sale
  },
  {
    name: 'qty',
    type: 'input',
    message: 'How many would you like to buy?',
    validate: function(input){
      if(isNaN(input)||input.length<1){return 'Quantity must be a number.'};      
      return true;
    }
}]).then(function(ans){    
    ProductId = ans.id.slice(0,String(ans.id).indexOf('.'));
    Quantity = ans.qty;
    let Price = itemPrices[ProductId-1];
    if (Quantity === 0){return end();}
    return chkInventory(ProductId, Quantity, Price);    
  });
}
function chkInventory(ProductId, Quantity, Price){
  let sql = "Select count('x') as cnt from Products where ITEM_ID = ? and STOCK_QUANTITY >= ?";
  connection.query(sql, [ProductId, Quantity], function(err,res){
    if(err){console.log(err); return end;}
    if(!res[0].cnt){
      console.log(res[0].cnt);
      console.log('Unable to complete order, stock unavailable.');

      return end();
    } else {
      completeOrder(ProductId, Quantity, Price);
    }
  });
}
function completeOrder(ProductId, Quantity, Price){
  let upd = 'UPDATE Products set STOCK_QUANTITY = STOCK_QUANTITY - ? WHERE ITEM_ID = ?'
  connection.query(upd, [Quantity, ProductId], function(err,res){
  if(err){console.log(err); return end;}
    console.log('=========================================================================================================');
    console.log('Your total purchase is ' + (Price * parseInt(Quantity) ));
    end();
  });
  
}
function end(){
  inq.prompt([
    {
      name: 'end',
      type: 'confirm',
      message: 'Do you wish to continue shopping?'
    }
  ]).then(
    function(ans){      
      if (!ans.end){
        console.log('Thanks for shoping Bamazon and have a GRREEEAT day!');
         connection.end();
         return;
       }
       
       return startup();
    }
  );  
}
function align(val,size){
  val = String(val).padStart(size/2);
  val = String(val).padEnd(size);
 return val;
}
startup();

