var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use('/', express.static(__dirname + '/build/'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('messageAdded', function(message) {
    socket.broadcast.emit('messageAdded', message);
  });
});

app.listen(3000, function() {
  console.log('server running');
});
