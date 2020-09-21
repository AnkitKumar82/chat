var mysql = require('mysql');
/*
Username: jaYkACuYXy

Database name: jaYkACuYXy

Password: 2k7TYXcf7y

Server: remotemysql.com

Port: 3306*/

//Local host data base info
// host: "localhost",
//   user: "root",
//   password: "Ankit@1234",
//   database: "ankitpersonal"
// });
/*
sql12.freemysqlhosting.net
name and databaes:sql12366720 	sql12366720
password: aYxW7ruxTV
*/
var con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12366720",
  password: "aYxW7ruxTV",
  database: "sql12366720"
});

con.connect(function(err) {
  if (err) throw err;
});


module.exports = con;