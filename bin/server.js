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
        userInfo["socketId"] = socket.id;
        listUsers.push(userInfo);
        socket.emit('login', {
          numUsers: numUsers,
          listUsers: listUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('user joined', {
          userInfo: socket.userInfo,
          numUsers: numUsers,
          listUsers: listUsers
        });
    });
    
    /**
     * Waiting-room
     */
    // when a user ask a battle
    socket.on("application battle", function (socketIdReceiver, infoUser) {
        socket.to(socketIdReceiver).emit('battle or not', {
            socketIdAsker: socket.id,
            infoUser: infoUser
        });
    });
    
    // when a user confirm a battle
    socket.on("accept battle", function (socketIdAsker) {
        socket.to(socketIdAsker).emit('battle accepted');
    });
    
    // when a user refuse a battle
    socket.on("refuse battle", function (socketIdAsker) {
        socket.to(socketIdAsker).emit('battle refused');
    });
    
    // when a user cancel application
    socket.on("cancel battle", function (socketIdReceiver) {
        socket.to(socketIdReceiver).emit('battle canceled');
    });

    /**
     * Battle
     */
    // when a user ask a battle
    socket.on("start battle", function (socketIdOpponent) {
        socket.to(socketIdOpponent).emit('ready fight');
    });
    // when a user attack
    socket.on("attack to", function (socketIdOpponent, attack) {
        socket.to(socketIdOpponent).emit('attack from', attack);
    });
    
    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
          --numUsers;
          listUsers.splice(listUsers.indexOf(socket.userInfo),1);

          // echo globally that this client has left
          socket.broadcast.emit('user left', {
            userInfo: socket.userInfo,
            numUsers: numUsers,
            listUsers: listUsers
          });
        }
    });
});