const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,  '../public');
var app = express();
//we pass this server varialbe in app.listen to create server.
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT || 9090;

app.use(express.static(publicPath));
// to establish the server connection --- server is up/down
io.on('connection', (socket) =>{
  console.log('New user connected');

  /*
    socket.emit is used to emit message to the user who sends the message to the chat.
  */


  socket.emit('newMessage',generateMessage('Admin', 'Welcome to the chat app'));

  /*
    socket.broadcast.emit is used to emit message to all the users connected to the chat except to the sender.
  */

  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined the chat app'));
  /*
    io.emit is used to emit message to all the users connected to the chat.
  */
  socket.on('createMessage', (message, callback) =>{
    console.log('New message', message);

  io.emit('newMessage',generateMessage(message.from, message.text));
  callback('this is from the server');
});


// to emit and send location

socket.on('createLocationMessage', (coords) => {
io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
});
// to establish the server connection --- server is up/down
socket.on('disconnect', () =>{
    console.log('User disconnected from server');
  });
});
server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
