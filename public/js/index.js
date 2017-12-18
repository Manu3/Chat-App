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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  console.log('new message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

jQuery('#messages').append(li);
});

/*
to emit location message URL
*/
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

/*
to emit the message from client
*/
// socket.emit('createMessage', {
//   from: 'Manu',
//   text :'hi'
// },function(data){
//     console.log('got it', data);
// });

jQuery('#message-form').on('submit', function (e){
  // to prevent appending message in url
  e.preventDefault();
  var messageTextBox = jQuery('[name =  message]');
// to emit the message from client
  socket.emit('createMessage', {
    from: 'User',
    text : messageTextBox.val()
  },function(data){
    messageTextBox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by browser');
  }


//to disable button while service call is on--

locationButton.attr('disabled', 'disabled').text('Sending location..');

  navigator.geolocation.getCurrentPosition(function (position){
    locationButton.removeAttr('disabled').text('Send location..');
  //  console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
      locationButton.removeAttr('disabled').text('Send location..');
      alert('unable to fetch location');
  });
});
