var express = require('express');
var app = express();
app.use(express.static(__dirname));

var port = process.env.PORT || 4466;
console.log('Server started in port: %d', port)
app.listen(port);