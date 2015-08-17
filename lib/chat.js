var socket = require('socket.io');

exports.listen = function(server){
    io = socket.listen(server);
    io.sockets.on('connection', function(socket){
        console.log('Connected');
        
        socket.on('atom:message', function(data) {
          console.log("New Message:" ,data);
          io.sockets.emit('atom:message',data);
        });

        socket.on('disconnect', function(){
          console.log("Disconnected");
        });
    });
}
