"use strict";
exports.__esModule = true;
var debugFactory = require("debug");
var http = require("http");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var sample_1 = require("./routes/sample");
var debug = debugFactory('app:server');
var staticsPath = __dirname;
var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(staticsPath, 'public')));
var port = process.env.PORT || 3000;
app.set('port', port);
app.use('/', sample_1["default"]);
var server = http.createServer(app);
server.listen(port);
server.on('error', function (err) {
    console.error(err);
});
server.on('listening', function () {
    var port = server.address().port;
    debug('Listening on ' + port);
});
