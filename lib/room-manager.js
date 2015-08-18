function Room(id, name, owner) {
  this.id = id;
  this.name = name;
  this.owner = owner;
  this.people = [];
};

Room.prototype.add = function(user) {
  this.people.push(user);
  user.socket.join(this.id);
  this.broadcast("atom:room:new-user", user);
};

Room.prototype.removeUser = function(user) {
  for (var i=0; i<this.people.length; i++) {
     if (this.people[i] == user) break;
  }
  if (i < this.people.length) {
    this.people.splice(i,1);
  }
}

Room.prototype.broadcast = function(msg, data) {
   this.owner.socket.to(this.id).emit(msg, data);
}

module.exports = Room;
