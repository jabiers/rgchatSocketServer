var port = process.env.PORT || 3000;
var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    moment = require('moment'),
    mongoose = require('mongoose');

//---------------------------------------------
//mongoose model & Controller Setting
//---------------------------------------------
// CONNECTION EVENTS
// When successfully connected
//mongoose.connection.on('connected', function () {
//    console.log('Mongoose default connection open to ');
//});
//
//// If the connection throws an error
//mongoose.connection.on('error',function (err) {
//    console.log('Mongoose default connection error: ' + err);
//});
//
//// When the connection is disconnected
//mongoose.connection.on('disconnected', function () {
//    console.log('Mongoose default connection disconnected');
//});
//
mongoose.connect('mongodb://mongodb.rgchat.net/rgchat', function(err) {
    console.log(err);
});

var chatController = require('./server/controllers/chatHistory.Controller');

//---------------------------------------------
// Express Routing & Setting
//---------------------------------------------

app.get('*', function(req, res, next) {
 console.log('옴');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));
app.use('/lodash', express.static(__dirname + '/node_modules/lodash'));
app.use('/scripts', express.static(__dirname + '/public/src/scripts'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/client', function (req, res) {
    res.sendFile(__dirname + '/public/views/client.html');
});

app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/public/views/admin.html');
});

app.use('/api', require('./routes/apiRoute'));
//---------------------------------------------
// Socket IO Setting
//---------------------------------------------

if (!process.env.noredis) {
    var redis = require('socket.io-redis');
    io.adapter(redis({host: 'redis.rgchat.net', port: 6379}));
}

var users = {};

io.sockets.on('connection', function (client) {
    require('./server/controllers/clientSocket.Controller')(io, client, users);
    require('.server/controllers/agentSocket.Controller')(io, client, users);
});

http.listen(port);
