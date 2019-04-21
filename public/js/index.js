var socket = io();

socket.on('connect', function(){
  console.log('Connected');
});

socket.on('newMessage', function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  })
  $("#messages").append(html);

  // var li = $("<li></li>");
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = $("#location-message-template").html();
  var html = Mustache.render(template, {
    from : message.from,
    createdAt: formattedTime,
    url: message.url
  });
  $("#messages").append(html);
});


socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

$("#message-form").on('submit', function(e){
  e.preventDefault();

  var messageTextBox = $("[name=message]");

  socket.emit('createMessage', {
    from: "User",
    text: messageTextBox.val()
  },function (ack) {
    messageTextBox.val('');
  });
});

var locationButton = $("#send-location");
locationButton.on('click',function(){
  if(!navigator.geolocation){
    alert("Your browser doesn't support geolocation");
  }

  locationButton.prop('disabled','disabled').text("Sending location");

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text("Send location");
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    },function(){
    });
  }, function(){
    locationButton.removeAttr('disabled').text("Send location");
    alert("Unable to fetch location");
  });
});
