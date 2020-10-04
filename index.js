const express = require('express');
const app = express();
const con = require('./mysql.js');
const path = require('path');

const ConnectionsService = require('./Service/Connections.js');
const NewService = require('./Service/New.js');
const LoginService = require('./Service/Login.js');
const server = require('http').Server(app);
const io = require('socket.io')(server);
var cors = require('cors');
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors());
io.origins('*:*') // for latest version
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());


//Serve static files in production mode
if(process.env.NODE_ENV === "production"){
	app.use(express.static('client/build'));
	app.get('*',(req,res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	});
}
io.on("connection",(socket)=>{
	socket.on('updatesocket',(body)=>{
		LoginService.updateSocket(body,socket);
	});
	socket.on('login',body=>{
		LoginService.login(body,socket,io);
	});
	socket.on('new_user',body=>{
		LoginService.newuser(body,socket,io);
	});
	socket.on('logout',body=>{
		LoginService.logout(body,socket,io);
	})
	socket.on('new',body=>{
		NewService.newSVC(body,socket);
	});
	socket.on('search_query',body=>{
		NewService.searchQuerySVC(body,socket);
	});
	socket.on('new_req_add',body=>{
		NewService.newreqaddSVC(body,socket,io);
	})
	socket.on('cancel_request',body=>{
		NewService.cancelSVC(body,socket,io);
	})
	socket.on('accept',body=>{
		NewService.acceptSVC(body,socket,io);
	});
	socket.on('add_new',body=>{
		NewService.addNewSVC(body,socket,io);
	})
	socket.on('sent_data',body=>{
		ConnectionsService.msgSVC(body,socket,io);
	});
	socket.on('start',body=>{
		ConnectionsService.startSVC(body,socket);
	});
	socket.on('all_data',body=>{
		ConnectionsService.allDataSVC(body,socket);
	});
	socket.on('delete_conn_start',body=>{
		ConnectionsService.deleteConnSVC(body,socket,io);
		})
});
server.listen(process.env.PORT || 5000,()=>{
	console.log("server listening at ",process.env.PORT || 5000);
});