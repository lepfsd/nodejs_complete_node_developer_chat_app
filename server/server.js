const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000; 

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('new user connected');

	/*socket.emit('newEmail', {
		from: 'lepfsd@live.com',
		text: 'hey what is going on',
		createAt: 123
	}); */
	
	socket.emit('newMessage', {
		from: 'John',
		text: 'Sew you then',
		cretedAt: 123
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
	});

	socket.on('createEmail', (newEmail) => {
		console.log('createEmail', newEmail);
	});

	socket.on('disconnect', () => {
		console.log('uer was disconnected');
	});
});

server.listen(4000, () => {
	console.log(`server is up on ${port} port`);
});

