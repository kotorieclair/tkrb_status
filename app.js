var express = require('express');
var app = express();
var port = 3000

app.use(express.static('./dest'));

app.listen(port, function() {
  console.log("server starting at port: " + port);
});
