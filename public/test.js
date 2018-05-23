var express = require('express');
var bodyParser = require("body-parser");
var mysql = require('mysql');
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/public'));

//login
app.post('/test', function (req, res) {
    console.log(req);
})

app.listen(3001);