var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var enums = require("./enums");

app.use('/', express.static(__dirname + '/build/'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

var users = [];

function addUser(username){
  users.push(username);
  io.emit(enums.USER_LIST, users);
  io.emit(enums.MESSAGE, {
    username: 'chatbot',
    message: username + " has joined the chat"
  });
};

function removeUser(username){
  var index = users.indexOf(username);
  if(index == -1){
    return;
  }

  users.splice(index, 1);
  io.emit(enums.USER_LIST, users);
  io.emit(enums.MESSAGE, {
    username: 'chatbot',
    message: username + " has left the chat"
  });
};

io.on('connection', function(socket) {
  var socketUsername;

  socket.on(enums.MESSAGE, function(data){
    io.emit(enums.MESSAGE, {
      username: socketUsername,
      message: data
    });
  });

  socket.on(enums.LOGIN, function(username){
    socketUsername = username;
    addUser(socketUsername);
  });

  socket.on('disconnect', function() {
    removeUser(socketUsername);
    console.log('user disconnected');

  });

});

server.listen(3000, function() {
  console.log('server running');
});
