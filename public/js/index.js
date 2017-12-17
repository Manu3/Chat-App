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
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

jQuery('#messages').append(li);
});

// to emit the message from client
// socket.emit('createMessage', {
//   from: 'Manu',
//   text :'hi'
// },function(data){
//     console.log('got it', data);
// });

jQuery('#message-form').on('submit', function (e){
  // to prevent appending message in url
  e.preventDefault();
// to emit the message from client
  socket.emit('createMessage', {
    from: 'User',
    text : jQuery('[name =  message]').val()
  },function(data){
    //  console.log('got it', data);
  });
});
