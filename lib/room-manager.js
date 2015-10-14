function Room(id, name, owner) {
  this.id = id;
  this.name = name;
  this.owner = owner;
  this.people = [];
};

Room.prototype.addUser = function(user) {
  this.people.push(user);
  user.socket.join(this.id);
};

Room.prototype.removeUser = function(user) {
  this.people = this.people.filter(function(person) {
    return person.id != user.id;
  });
}

function RoomManager() {
  this.rooms = [new Room(0, "Atom", null)];
  this.nextId = 1;
};

RoomManager.prototype.add = function(name, user) {
  var room = new Room(this.nextId++, name, user);
  this.rooms.push(room);
  return room;
}

RoomManager.prototype.addToRoom = function (id, user) {
  var room = this.getRoom(id);
  if(room != undefined) {
    room.addUser(user);
    user.currentRoom = id;
  }
};

RoomManager.prototype.leaveFromRoom = function (id, user) {
  var room = this.getRoom(id);
  if(room != undefined) {
    room.removeUser(user);
    console.log(user.username, "left from", room.name);
    if(room.id != 0 && room.people.length <= 0) {
      this.remove(room.id);
      console.log("Room", room.name, "removed.");
    }
  }
};

RoomManager.prototype.remove = function(id) {
  this.rooms = this.rooms.filter(function(room) {
    return room.id != id;
  });
};

RoomManager.prototype.getRooms = function() {
  var rooms = [];
  this.rooms.forEach(function(room) {
    rooms.push({id:room.id, name:room.name});
  });
  return rooms;
};

RoomManager.prototype.getRoom = function(id) {
  for (var i = 0; i < this.rooms.length; i++)
    if (this.rooms[i].id == id)
      return this.rooms[i];
};

module.exports = RoomManager;
