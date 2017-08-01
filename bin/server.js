var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// ROOM
var numUsers = 0;
var listUsers = [];
io.on('connection', function (socket) {
    var addedUser = false;

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (userInfo) {
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.userInfo = userInfo;
        ++numUsers;
        addedUser = true;
        listUsers.push(userInfo);
        socket.emit('login', {
          numUsers: numUsers,
          listUsers: listUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
          userInfo: socket.userInfo,
          numUsers: numUsers
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
          --numUsers;
          listUsers.splice(listUsers.indexOf(userInfo),1);

          // echo globally that this client has left
          socket.broadcast.emit('user left', {
            userInfo: socket.userInfo,
            numUsers: numUsers
          });
        }
    });
});