const con = require("../mysql");
const jwtVerify = require("./JWT").jwtVerify;
const getToken = require("./JWT").getToken;
const updateSocket = async function(body,socket){
	// try{
		var user_id = await jwtVerify(body.user_id,socket);
		if(user_id==-1){
			return;
		}
	// }catch(err){
	// 	console.log(err);
	// }
	mysqlQuery = `update users set socket='${socket.id}' where user_id='${user_id}'`;
		con.query(mysqlQuery,(err,res)=>{
		if(err) console.log(err);
	})
  
}
const logout = async function(body,socket,io){
	let user_id = await jwtVerify(body.user_id,socket);
  	if(user_id === -1) return;
	let mysqlQuery = `update users set online=0 where user_id='${user_id}'`;
	console.log('user_id received',user_id);
	con.query(mysqlQuery,(err,result)=>{
		if(err) console.log(err);
		console.log(result,"result logout");
		mysqlQuery = `select user_one,user_two from connections where user_one=${user_id} or user_two=${user_id}`;
		con.query(mysqlQuery,(err,res)=>{
			if(err) console.log(err);
			if(res.length>0){
				res = res.map((value,index)=>{
					return parseInt(user_id)===parseInt(value.user_two)?value.user_one : value.user_two;
				});
				console.log(res);
				mysqlQuery = `select * from users where user_id in (${res})`;
				con.query(mysqlQuery,(err,resultSockets)=>{
					if(err) console.log(err);
					if(resultSockets.length>0){
						resultSockets.forEach(element => {
							io.to(element.socket).emit('update_status',{online:0,user_id:user_id});
						})
					}
				});
			}
		})
	})
}
const login =async function(body,socket,io){
	let username = body.username;
	let password = body.password;
	if(username === '' || password===''){
		return;
	}
	let mysqlQuery = `select * from users where username='${username}' and password='${password}'`;
	con.query(mysqlQuery,(err,result)=>{
		if(result.length>0){
		let user_id = result[0].user_id;
		let username = result[0].username;
		mysqlQuery = `update users set online='1',socket='${socket.id}' where user_id='${user_id}'`;
		con.query(mysqlQuery,async (err,res)=>{
		let user_id_temp = await getToken(user_id);
		console.log("user_id_temp okay should be returned:",user_id_temp);
		socket.emit('login_success',{status:true,user_id:user_id_temp,username:username});
		mysqlQuery = `select user_one,user_two from connections where user_one=${user_id} or user_two=${user_id}`;
		con.query(mysqlQuery,(err,res)=>{
			if(err) console.log(err);
			if(res.length>0){
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
				}
			})
		});
		}else{
			socket.emit('login_success',{status:false,errorMessage:"Username or password wrong!"});
		}
	});
}

const newuser =async function(body,socket,io){
  let username = body.username;
  let password = body.password;
  if(username === '' || password===''){
    return;
  }
  let mysqlQuery = `select * from users where username='${username}'`;
  con.query(mysqlQuery,(err,result)=>{
    if(result.length==0){
      mysqlQuery = `insert into users(username,password,online,socket) values('${username}','${password}','1','${socket.id}')`;
      con.query(mysqlQuery,(err,res)=>{
        if(err) console.log("An error occurred",err);
        let mysqlQuery = `select * from users where username='${username}' and password='${password}'`;
        con.query(mysqlQuery,async (err,results)=>{
          if(err) console.log(err);
		  let user_id= await getToken(results[0].user_id);
          socket.emit('login_success',{status:true,user_id:user_id,username:username});
        })
        // });
      });
    }else{
      socket.emit('login_success',{status:false,errorMessage:"User already exist!"});
    }
  });
}

module.exports = {
  login,
  updateSocket,
  newuser,
  logout
}