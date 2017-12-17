const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
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
  socket.emit('newMessage',{
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  /*
    socket.broadcast.emit is used to emit message to all the users connected to the chat except to the sender.
  */
  socket.broadcast.emit('newMessage',{
    from: 'Admin',
    text: 'Manu has joined the chat room',
    createdAt: new Date().getTime()
  });
  /*
    io.emit is used to emit message to all the users connected to the chat.
  */
  socket.on('createMessage', (message) =>{
    console.log('new message', message);
    io.emit('newMessage',{
    from: message.from,
    text: message.text,
    createdAt: new Date().getTime()
  });
});



// to establish the server connection --- server is up/down
socket.on('disconnect', () =>{
    console.log('User disconnected from server');
  });
});
server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
