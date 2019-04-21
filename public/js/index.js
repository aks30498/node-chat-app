var socket = io();

socket.on('connect', function(){
  console.log('Connected');
});

socket.on('newMessage', function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var li = $("<li></li>");
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  $("#messages").append(li);
});

socket.on('newLocationMessage', function(message){
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var li = $("<li></li>");
  var a = $("<a target='_blank'>My Current Location</a>");
  li.text(`${message.from} ${formattedTime}: `);
  a.prop('href',`${message.url}`);
  li.append(a);
  $("#messages").append(li);
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
