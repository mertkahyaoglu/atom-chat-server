function User(id, username, socket) {
  this.id = id;
  this.username = username;
  this.socket = socket;
  this.currentRoom = 0;
}

function UserManager() {
  this.users = [];
  this.nextId = 1;
}

UserManager.prototype.isUserExists = function(username) {
  this.users.forEach(function(user) {
    if(user.username == username)
      return true;
  });
  return false;
}

UserManager.prototype.add = function(name, socket) {
  var user = new User(this.nextId++, name, socket);
  this.users.push(user);
  return user;
}

UserManager.prototype.remove = function(socket) {
  for (var i=0; i<this.users.length; i++)
    if (this.users[i].socket.id == socket.id)
      break;

  if (i < this.users.length)
    this.users.splice(i,1);
}

UserManager.prototype.changeUsername = function(username, socket) {
  for (var i = 0; i < this.users.length; i++)
    if (this.users[i].socket.id == socket.id)
      this.users[i].username = username;
}

UserManager.prototype.getUsers = function() {
  return this.users;
}

UserManager.prototype.getUser = function(socket) {
  for (var i = 0; i < this.users.length; i++)
    if (this.users[i].socket.id == socket.id)
      return this.users[i];
}

UserManager.prototype.getOnlineCount = function() {
  return this.users.length;
}

module.exports = UserManager;
