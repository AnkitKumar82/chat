const con = require("../mysql");
const jwtVerify = require("./JWT").jwtVerify;
const newSVC = async function(body,socket){
  let user_id = await jwtVerify(body.user_id,socket);
  if(user_id === -1) return;
  let mysqlQuery = `select connection,user_one,user_two from connections where (user_one='${user_id}' or user_two='${user_id}') and status='0'`;
  con.query(mysqlQuery,(err,newcon)=>{
      if(err) console.log(err);
      let newconList = newcon.map((value,index)=>{
        return (parseInt(user_id)===parseInt(value.user_two))? value.user_one : value.user_two;
      });
      if(newconList.length>0){
        mysqlQuery = `select user_id,username,online from users where user_id in (${newconList})`;
        con.query(mysqlQuery,(err,result)=>{
          if(err){ 
            console.log(err);
          }
          socket.emit('new_res',{users:result,newcon:newcon});
        });
      }else{
        socket.emit('new_res',{});
      }
      
  }); 
}

const addNewSVC = async function(body,socket,io){
  let user_id =await jwtVerify(body.user_id,socket);
  if(user_id === -1) return;
  let new_id = parseInt(body.data.user_id);
  let mysqlQuery = `insert into connections(user_one,user_two,status) values('${user_id}','${new_id}','0');`;
  con.query(mysqlQuery,(err,inserted)=>{
    if(err) console.log(err);
    mysqlQuery = `select * from users where user_id='${new_id}'`;
    con.query(mysqlQuery,(err,res)=>{
      if(err) console.log(err);
      mysqlQuery = `select * from users where user_id='${user_id}'`;
      con.query(mysqlQuery,(err,result)=>{
        io.to(res[0].socket).emit('new_req_res',{user_id:result[0].user_id,username:result[0].username,online:result[0].online});
      })
    });
  });

}
const acceptSVC = async function(body,socket,io){
  let user_id =await jwtVerify(body.user_id,socket);
  if(user_id === -1) return;
  let new_id = parseInt(body.data.user_id);
  let mysqlQuery = `update connections set status=1 where (user_one='${new_id}' and user_two='${user_id}');`;
  con.query(mysqlQuery,(err,updated)=>{
      if(err) console.log(err);
        socket.emit('accept_rec_req_res',body.data);
        mysqlQuery = `select * from users where user_id='${user_id}'`;
        con.query(mysqlQuery,(err,res)=>{
          if(err) console.log(err);
          mysqlQuery = `select * from users where user_id='${new_id}'`;
          con.query(mysqlQuery,(err,result)=>{
            if(err) console.log(err);
            console.log(result[0].socket);
            io.to(result[0].socket).emit('accept_sent_req_res',{user_id:res[0].user_id,username:res[0].username,online:res[0].online});
          })
        });
      });
}

const cancelSVC = async function(body,socket,io){
  let user_id =await jwtVerify(body.user_id,socket);
  if(user_id === -1) return;
  let new_id = parseInt(body.data.user_id);
  let user_list = [user_id,new_id];
  let mysqlQuery = `delete from connections where (user_one in (${user_list}) and user_two in (${user_list}));`;
  con.query(mysqlQuery,(err,updated)=>{
      if(err) console.log(err);
        mysqlQuery = `select * from users where user_id='${new_id}'`;
        con.query(mysqlQuery,(err,res)=>{
            if(err) console.log(err);
            io.to(res[0].socket).emit('cancel_req_res',{user_id:user_id});
          })
        });
}
const searchQuerySVC = async function(body,socket){
  let user_id =await jwtVerify(body.user_id,socket);
  if(user_id === -1) return;

  let searchQuery = body.searchQuery;
  let mysqlQuery = `select user_id,username from users where username like '%${searchQuery}%'`;
  con.query(mysqlQuery,(err,res)=>{
    if(err) console.log(err);
    mysqlQuery = `select * from connections where (user_one='${user_id}' or user_two='${user_id}')`;
    con.query(mysqlQuery,(err,result)=>{
      if(err) console.log(err);
      let connList = [];
      if(result.length > 0){
        connList = result.map((value,index)=>{
          return (parseInt(user_id)===parseInt(value.user_two))? value.user_one : value.user_two;
        });
      }
      connList.push(user_id);
      res = res.filter((value)=>{
        return !connList.includes(value.user_id);
      });
      socket.emit('search_query_res',res);
    })
  })
}
const newreqaddSVC = async function(body,socket,io){
  let user_id = await jwtVerify(body.user_id,socket);
  if(user_id === -1) return;
  const new_id = body.data.user_id;
  console.log("user ",user_id);
  let mysqlQuery = `insert into connections(user_one,user_two,status) values('${user_id}','${new_id}','0')`;
  con.query(mysqlQuery,(err,res)=>{
    if(err) console.log(err);
    mysqlQuery = `select * from users where user_id=${user_id}`;
    con.query(mysqlQuery,(err,res)=>{
      if(err) console.log(err);
      let user = {
        user_id : res[0].user_id,
        username : res[0].username,
        online : res[0].online
      }
      mysqlQuery = `select user_id,username,online,socket from users where user_id=${new_id}`;
      con.query(mysqlQuery,(err,result)=>{
        if(err) console.log(err);
        user_1 = {
          user_id : result[0].user_id,
          username : result[0].username,
          online : result[0].online
        }
        io.to(result[0].socket).emit('new_req_add_rec_res',[user]);
        socket.emit('new_req_add_sent_res',[user_1])
      });
    });
  })
}
module.exports = {
  newSVC,
  acceptSVC,
  cancelSVC,
  addNewSVC,
  searchQuerySVC,
  newreqaddSVC
}