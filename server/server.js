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
    from: "Someone",
    text: "Something",
    createdAt: 1234
  });

  socket.on('createMessage', (createMessage) => {
    console.log("Create Message" , createMessage);
  })

  socket.on('disconnect', () => {
    console.log("Disconnected from user");
  })
});
app.use(express.static(publicPath));

server.listen(port, ()=> {
  console.log(`Server started at port ${port}`);
});
