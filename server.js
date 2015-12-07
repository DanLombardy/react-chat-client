var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var enums = require("./enums");

app.use('/', express.static(__dirname + '/build/'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

io.on('connection', function(socket) {
  var socketUsername;

  socket.on('login', function(data) {
    socketUsername = data.username;
    io.emit('message', data);
  });

  socket.on('message', function(message) {
    io.emit('message', {
      sender: socketUsername,
      message: message
    });
  });

  socket.on('disconnect', function() {
    io.emit('disconnect', socketUsername);
  });

  socket.on('logout', function(data) {
    io.emit('message', data);
  });

});

server.listen(3000, function() {
  console.log('server running');
});
