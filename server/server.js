const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage, generateLocationMessage} = require("./utils/message");
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log("New User Connected!");

  socket.emit('newMessage', generateMessage("Admin", "Welcome to chat app!"));

  socket.broadcast.emit('newMessage', generateMessage("Admin", "A new user has joined!"));

  socket.on('createMessage', (message, callback) => {
    console.log("Create Message" , message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback("This message is from server");
    // socket.broadcast.emit('newMessage', generateMessage("Admin", "New user has joined"));
  })

  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log("Disconnected from user");
  })
});
app.use(express.static(publicPath));

server.listen(port, ()=> {
  console.log(`Server started at port ${port}`);
});
