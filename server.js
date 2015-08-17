var express    = require('express'),
    app        = express(),
    port       = process.env.PORT || 3000,
    chat       = require("./lib/chat");

var server = app.listen(port);
chat.listen(server);
console.log("Server running on: "+port);
