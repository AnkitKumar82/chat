const con = require("../mysql");
const jwtVerify = require("./JWT").jwtVerify;
const startSVC = async function(body,socket){
  try{
    var user_id = await jwtVerify(body.user_id,socket);
  }catch(err){
    console.log(err);
    return;
  }
  let mysqlQuery = `select * from connections where (user_one='${user_id}' or user_two='${user_id}') and status='1'`;
  con.query(mysqlQuery,(err,result)=>{
      if(err) console.log(err);
      result = result.map((value,index)=>{
        return parseInt(user_id)===parseInt(value.user_two)?value.user_one : value.user_two;
      });
      //still need to send only connections list
      if(result.length > 0){
        console.log(result,"connectios res");
        mysqlQuery = `select user_id,username,online from users where user_id in (${result})`;
        con.query(mysqlQuery,(err,res)=>{
          if(err){ 
            console.log(err);
          }
          socket.emit('start_res',res);
        });
      }else{
        socket.emit('start_res',[]);
      }
  }); 
}
const msgSVC = async function(body,socket,io){
  let user_id = await jwtVerify(body.user_id,socket);
  if(user_id === -1) return;
  let other_id = body.other.user_id;
  let mysqlQuery = `select * from users where user_id='${other_id}'`;
  con.query(mysqlQuery,(err,result)=>{
      if(err) console.log(err);
        if(parseInt(result[0].online)==1){
          io.to(result[0].socket).emit('rec_data',{user_id:user_id,msg:body.msg});
          mysqlQuery = `insert into data(user_one,user_two,data,status) values(${user_id},${other_id},'${body.msg}',1)`;
        }else{
          mysqlQuery = `insert into data(user_one,user_two,data,status) values(${user_id},${other_id},'${body.msg}',0)`;
        }
        con.query(mysqlQuery,(err,result)=>{
          if(err) console.log('error');//console.log(err);
        });
      });
}
const allDataSVC = async function(body,socket){
  let user_id = await jwtVerify(body.user_id,socket);
  if(user_id === -1) return;
  let other_id = body.other.user_id;
  let user_list = [user_id,other_id];
  let mysqlQuery = `select * from data where user_one in (${user_list}) and user_two in (${user_list})`;
  con.query(mysqlQuery,(err,res)=>{
    if(err) console.log(err);
    res = res.map((val)=>{
      if(parseInt(val.user_one)===parseInt(user_id)){
        return {user_id:user_id,msg:val.data}
      }else{
        return {user_id:other_id,msg:val.data}
      }
    });
    socket.emit('all_data_res',{old_msg:res,user_id:other_id});
  })
}
const deleteConnSVC = async function(body,socket,io){
  let user_id = await jwtVerify(body.user_id,socket);
  if(user_id === -1) return;
  let other_id = body.other_id;
  let user_list = [user_id,other_id];
  let mysqlQuery = `select * from users where user_id=${other_id}`;
  con.query(mysqlQuery,(err,res)=>{
    if(err) console.log(err);
    console.log('socket')
    mysqlQuery = `delete from connections where user_one in (${user_list}) and user_two in (${user_list})`;
    con.query(mysqlQuery,(err,result)=>{
      if(err) console.log(err);
      io.to(res[0].socket).emit('delete_conn',{user_id:user_id});
    })
  })
}
module.exports = {
  startSVC,
  msgSVC,
  allDataSVC,
  deleteConnSVC
}