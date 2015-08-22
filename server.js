var express    = require('express'),
    app        = express(),
    port       = process.env.PORT || 3000,
    chat       = require("./lib/chat");

app.set('view engine', 'jade');
app.set('views', __dirname + '/public/views')
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
  res.render('index');
})
var server = app.listen(port);
chat.listen(server);
console.log("Server running on: "+port);
