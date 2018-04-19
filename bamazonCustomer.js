var inq = require('inquirer');
var mysql = require('mysql');
var linelen = 0;
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
 let sql = 'Select * from products';
 let bHeader = false;
 connection.query(sql,function(err,res){
  if(err){console.log(err); return}
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
    console.log(header);
    console.log('---------------------------------------------------------------------------------------------------------');
    bHeader = true;
   }
   line += align(val[0],7) + '   ';
   line += align(val[1],40) + '   ';
   line += align(val[2],20) + '   ';
   line += align(val[3],10) + '   ';
   line += align(val[4],10) + '   ';   
   console.log(line);
  }
 });
 connection.end();
}
function align(val,size){
  val = String(val).padStart(size/2);
  val = String(val).padEnd(size);
 return val;
}
startup();