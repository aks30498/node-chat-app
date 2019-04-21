var socket = io();

socket.on('connect', function(){
  console.log('Connected');
});

socket.on('newMessage', function(message){
  console.log("New Message:" , message);
  var li = $("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  $("#messages").append(li);
});

socket.on('newLocationMessage', function(message){
  console.log("New Message:" , message);
  var li = $("<li></li>");
  var a = $("<a target='_blank'>My Current Location</a>");
  li.text(`${message.from}: `);
  a.prop('href',`${message.url}`);
  li.append(a);
  $("#messages").append(li);
});


socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

$("#message-form").on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: "User",
    text: $("[name=message]").val()
  },function (ack) {
    console.log(ack);
  });
});

var locationButton = $("#send-location");
locationButton.on('click',function(){
  if(!navigator.geolocation){
    alert("Your browser doesn't support geolocation");
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function(){
    alert("Unable to fetch location");
  });
});
