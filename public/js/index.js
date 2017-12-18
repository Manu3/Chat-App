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
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
    jQuery('#messages').append(html);
});

/*
to emit location message URL
*/
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
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
