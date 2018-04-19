var inq = require('inquirer');
var mysql = require('mysql');
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
 var sql = 'Select * from products';
 connection.query(sql,function(err,res){
  if(err){console.log(err); return}
  for (var obj in res){
   let val  = Object.values(res[obj]);
   let key  = Object.keys(res[obj]);
   console.log('---------------------');
   for(var i in val){
     console.log(key[i] + ' : ' + val[i]);
   }
  }
 });
 connection.end();
}
startup();