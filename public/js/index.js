var socket = io();

socket.on('connect', () => {
	console.log('connected to server');

	/*socket.emit('createEmail', {
		to: 'jen@example.com',
		text: 'Hey, this is andrew'
	});*/

	socket.emit('createMessage', {
		from: 'Andrew',
		text: 'Yup, that is ok'
	});
});	

socket.on('disconnect', () => {
	console.log('disconnect from server');
});

socket.on('newMessage', function(message) {
	console.log('New message', message);
});

