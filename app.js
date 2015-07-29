var express = require('express');
var app = express();
var port = 3000

app.use(express.static('./build'));

app.listen(port, function() {
  console.log("server starting at port: " + port);
});
