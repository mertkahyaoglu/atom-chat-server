var socket = require('socket.io');
var UserManager = require('./user-manager');
var userManager = new UserManager();

var RoomManager = require('./room-manager');
var roomManager = new RoomManager();

exports.listen = function(server){
    io = socket.listen(server);
    io.sockets.on('connection', function(socket){
        io.sockets.emit('atom:online', userManager.getOnlineCount());

        socket.on('atom:user', function(username, cb){
          var newUser = userManager.add(username, socket);
          console.log("New User:", newUser.id, newUser.username);
          roomManager.addToRoom(0, newUser);
          cb(newUser.id);
        })

        socket.on('atom:message', function(data) {
          console.log("New Message:" ,data);
          io.sockets.in(data.roomId).emit('atom:message',data);
        })

        socket.on('atom:username', function(username){
          userManager.changeUsername(username, socket);
        })

        socket.on('atom:rooms', function(cb){
          var rooms = roomManager.getRooms();
          cb(rooms);
        })

        socket.on('atom:rooms:create', function(name, cb) {
          var user = userManager.getUser(socket);
          if (user != undefined) {
            var newRoom = roomManager.add(name, user);
            var prevRoom = user.currentRoom;
            roomManager.addToRoom(newRoom.id, user);
            if (prevRoom != 0) {
              roomManager.leaveFromRoom(prevRoom, user);
            }
            cb(newRoom.id);
            console.log(user.username, "created", "Room:", name);
          }
        })

        socket.on('atom:rooms:join', function(id){
          var user = userManager.getUser(socket);
          if (user != undefined) {
            var prevRoom = user.currentRoom;
            roomManager.addToRoom(id, user);
            if (prevRoom != 0) {
              roomManager.leaveFromRoom(prevRoom, user);
            }
            console.log(user.username, "joined", "Room:", id);
          }
        })

        socket.on('disconnect', function(){
          console.log("Disconnected");
          var user = userManager.getUser(socket);

          if (user != undefined) {
            if (user.currentRoom != 0) {
              roomManager.leaveFromRoom(user.currentRoom, user);
            }else {
              roomManager.leaveFromRoom(0, user);
            }
          }

          userManager.remove(socket);

          io.sockets.emit('atom:online', userManager.getOnlineCount());

          roomManager.rooms.forEach(function(room) {
            console.log("Room", room.name, "size:", room.people.length);
          });
        })
    });
}
