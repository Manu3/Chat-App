var socket = io();
// to establish the client connection --- client is up/down
socket.on('connect', function() {
  console.log('Connected to server');
});
// to establish the client connection --- client is up/down
socket.on('disconnect', function() {
  console.log('Disconnect from server');
});

// to print the message
socket.on('newMessage', function(message){
  console.log('new message', message);
});
