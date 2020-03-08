const con = require("../mysql");
const updateSocket = function(body,socket){
  let user_id = body.user_id;
  mysqlQuery = `update users set online='1',socket='${socket.id}' where user_id='${user_id}'`;
  con.query(mysqlQuery,(err,res)=>{
    //io.emit() update status in db
    if(err) console.log(err);
  })
}
const logout = function(body,socket,io){
  let user_id = body.user_id;
  let mysqlQuery = `update users set online='0' where user_id='${user_id}'`;
  con.query(mysqlQuery,(err,result)=>{
    if(err) console.log(err);
    mysqlQuery = `select user_one,user_two from connections where user_one=${user_id} or user_two=${user_id}`;
    con.query(mysqlQuery,(err,res)=>{
      if(err) console.log(err);
      res = res.map((value,index)=>{
        return parseInt(user_id)===parseInt(value.user_two)?value.user_one : value.user_two;
      });
      console.log(res);
      mysqlQuery = `select * from users where user_id in (${res})`;
      con.query(mysqlQuery,(err,resultSockets)=>{
        if(err) console.log(err);
        resultSockets.forEach(element => {
          io.to(element.socket).emit('update_status',{online:0,user_id});
        })
      });
    })
  })
}
const login = function(body,socket,io){
  let username = body.username;
  let password = body.password;
  if(username === '' || password===''){
    return;
  }
  let mysqlQuery = `select * from users where username='${username}' and password='${password}'`;
  con.query(mysqlQuery,(err,result)=>{
    //send emit to all friends:::: todo
    if(result.length>0){
      let user_id = result[0].user_id;
      let username = result[0].username;
      mysqlQuery = `update users set online='1',socket='${socket.id}' where user_id='${user_id}'`;
      con.query(mysqlQuery,(err,res)=>{
      socket.emit('login_success',{user_id:user_id,username:username});
      mysqlQuery = `select user_one,user_two from connections where user_one=${user_id} or user_two=${user_id}`;
      con.query(mysqlQuery,(err,res)=>{
        if(err) console.log(err);
        res = res.map((value,index)=>{
          return parseInt(user_id)===parseInt(value.user_two)?value.user_one : value.user_two;
        });
        console.log(res);
        mysqlQuery = `select * from users where user_id in (${res})`;
        con.query(mysqlQuery,(err,resultSockets)=>{
          if(err) console.log(err);
          resultSockets.forEach(element => {
            io.to(element.socket).emit('update_status',{online:1,user_id:user_id});
          })
        });
      })
      });
    }
  });
}

module.exports = {
  login,
  updateSocket,
  logout
}