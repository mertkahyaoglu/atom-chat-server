function User(id, username, socket) {
  this.id = id;
  this.username = username;
  this.socket = socket;
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
  var user = new User(this.nextId, name, socket);
  this.users.push(user);
  console.log("New User:", user.id, user.username);
  return this.nextId++;
}

UserManager.prototype.remove = function(socket) {
  for (var i=0; i<this.users.length; i++) {
    if (this.users[i].socket.id == socket.id) break;
  }
  if (i < this.users.length)
    this.users.splice(i,1);
}

UserManager.prototype.changeUsername = function(newUsername, socket) {
  this.users.forEach(function(user) {
    if(user.socket.id == socket.id)
      user.username = newUsername
  });
  console.log(this.users)
}

UserManager.prototype.getUsers = function() {
  return this.users;
}

UserManager.prototype.getUser = function(socket) {
  this.users.forEach(function(user) {
    if (user.socket.id == socket.id)
      return user;
  })
}

UserManager.prototype.getOnlineCount = function() {
  return this.users.length;
}

module.exports = UserManager;
