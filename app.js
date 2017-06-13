var express = require('express'),
	app = express(),
	server= require('http').createServer(app),
	io= require('socket.io').listen(server),
	mongoose = require('mongoose'),
	path = require('path');

const bodyParser = require('body-parser');
//const passport = require('passport');

const port = 9000;
const url ='mongodb://localhost/test';

var connections = [];
var local_chat_array = [];

//Sets Static Folder
app.use(express.static(path.join(__dirname,'/public')));

//gets the index route
app.get('/', (req,res)=>{
 	res.render('index.html');
});

//stats the server
server.listen(port, ()=>{
	console.log("Server started on port "+ port);
});

io.sockets.on('connection', function(socket){
	//io.sockets.emit('connected',{});

	connections.push(socket);
	console.log("Connected: %d socket", connections.length);
	io.sockets.emit('users_online',connections.length);

	socket.on('send message', function(data){
		io.sockets.emit('new message',data);
	});
	
	socket.on('send local chat message', function(data){
		local_chat_array.push(data);
		io.sockets.emit('new local chat message',data);
	});

	socket.on('get local chat array', function(data){
		socket.emit('send local chat array',local_chat_array);
	});


	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket),1)
		console.log("Disconnected: %d socket", connections.length)
	});
});


mongoose.connect(url, (err)=>{
	if(err)
	{
		console.log("Cant connect to mongodb");
	}else{
		console.log("Connected mongodb: "+url);
	}
});