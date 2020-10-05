var mysql = require('mysql');
/*
Username: jaYkACuYXy

Database name: jaYkACuYXy

Password: 2k7TYXcf7y

Server: remotemysql.com

Port: 3306*/

//Local host data base info
// var con = mysql.createConnection({
// host: "localhost",
//   user: "root",
//   password: "Ankit@1234",
//   database: "ankitpersonal"
// });

var con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12368881",
  password: "7k7pvKAjzs",
  database: "sql12368881"
});

con.connect(function(err) {
  if (err) throw err;
});


module.exports = con;