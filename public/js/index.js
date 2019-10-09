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

socket.on('createLocationMessage', (coords) => {
	io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
});

socket.on('disconnect', () => {
	console.log('disconnect from server');
});

socket.on('newMessage', function(message) {
	console.log('New message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
	e.preventDefault();

	socket.emit('createMessage', {
		form: 'User',
		text: jQuery(`[name=message]`).val()
	}, function() {

	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if(!navigator.geolocation) {
		return alert("geolocation not supported by your browser");
	}

	navigator.geolocation.getCurrentPosition(function(position) {
		//console.log(position);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function(){ 
		alert("unable to fetch location");
	});
});

