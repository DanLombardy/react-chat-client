var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var enums = require("./enums");

app.use('/', express.static(__dirname + '/build/'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

io.on('connection', function(socket) {
  var socketUsername;

  socket.on(enums.LOGIN, function(data) {
    socketUsername = data.username;
    io.emit(enums.MESSAGE, data);
  });

  socket.on(enums.MESSAGE, function(message) {
    io.emit(enums.MESSAGE, {
      sender: socketUsername,
      message: message
    });
  });

  socket.on(enums.DISCONNECT, function() {
    io.emit(enums.DISCONNECT, socketUsername);
  });

  socket.on(enums.LOGOUT, function(data) {
    io.emit(enums.MESSAGE, data);
  });
});

server.listen(3000, function() {
  console.log('server running');
});
