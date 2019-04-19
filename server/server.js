const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log("New User Connected!");

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user has joined the chat',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log("Create Message" , message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: 1234
    // });
  })

  socket.on('disconnect', () => {
    console.log("Disconnected from user");
  })
});
app.use(express.static(publicPath));

server.listen(port, ()=> {
  console.log(`Server started at port ${port}`);
});
