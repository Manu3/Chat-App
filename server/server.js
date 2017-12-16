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

io.on('connection', (socket) =>{
  console.log('New user connected');

  socket.on('disconnect', () =>{
    console.log('User disconnected from server');
  });
});
server.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
