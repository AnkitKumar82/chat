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

var con = mysql.createConnection({
  host: "https://remotemysql.com:3306",
  user: "jaYkACuYXy",
  password: "2k7TYXcf7y",
  database: "jaYkACuYXy"
});

con.connect(function(err) {
  if (err) throw err;
});


module.exports = con;