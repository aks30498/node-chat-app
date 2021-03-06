var socket = io();

function scrollToBottom() {
  //selectors
  var messages = $("#messages");
  var newMessage = messages.children('li:last-child');
  //heights
  var scrollHeight = messages.prop("scrollHeight");
  var scrollTop = messages.prop("scrollTop");
  var clientHeight = messages.prop("clientHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(scrollTop + clientHeight + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }

}

socket.on('connect', function(){
  var params = $.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href= "/";
    }else{

    }
  })
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
  scrollToBottom();
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
  scrollToBottom();
});


socket.on('disconnect', function(){
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(userList){
  // console.log(userList);
  var ol = $("<ol></ol>");
  userList.forEach(function(user){
    ol.append($("<li></li>").text(user));
  });

  $("#users").html(ol);
});

$("#message-form").on('submit', function(e){
  e.preventDefault();

  var messageTextBox = $("[name=message]");

  socket.emit('createMessage', {
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
