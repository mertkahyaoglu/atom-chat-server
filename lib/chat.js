var socket = require('socket.io');
var UserManager = require('./user-manager');
var userManager = new UserManager();

exports.listen = function(server){
    io = socket.listen(server);
    io.sockets.on('connection', function(socket){
        console.log('Connected');

        socket.on('atom:user', function(username, cb){
          var newUserId = userManager.add(username, socket);
          cb(newUserId);
          io.sockets.emit('atom:online', userManager.getOnlineCount());
        })

        socket.on('atom:message', function(data) {
          console.log("New Message:" ,data);
          io.sockets.emit('atom:message',data);
        });

        socket.on('atom:username', function(username){
          userManager.changeUsername(username, socket);
          console.log("Username Changed:", username);
        })

        socket.on('disconnect', function(){
          console.log("Disconnected");
          userManager.remove(socket);
          io.sockets.emit('atom:online', userManager.getOnlineCount());
        });
    });
}
