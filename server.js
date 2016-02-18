var port = process.env.PORT || 3000;
var express = require('express'),
app = express(),
http = require('http').Server(app),
io = require('socket.io')(http);

var redis = require('socket.io-redis');
io.adapter(redis({ host: 'syno.ml', port: 6379 }));

app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));
app.use('/angular',  express.static(__dirname + '/node_modules/angular'));
app.use('/jquery',  express.static(__dirname + '/node_modules/jquery'));
app.use('/bootstrap',  express.static(__dirname + '/node_modules/bootstrap'));
app.use('/lodash',  express.static(__dirname + '/node_modules/lodash'));
app.use('/scripts', express.static(__dirname + '/public/src/scripts'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/views/index.html');
});

// app.get('/client', function(req, res){
//     res.sendFile(__dirname + '/public/views/client.html');
// });

app.get('/client', function(req, res){
    res.sendFile(__dirname + '/public/views/client.html');
});
app.get('/client/:token', function(req, res){
    res.sendFile(__dirname + '/public/views/client.html');
});

var nameSpaces = ['/aaaa', '/bbbb', '/syno'];

nameSpaces.forEach(function(nsp) {
    console.log(nsp);
    var nameSpace = io.of(nsp);
    var Room;
    nameSpace.on('connection', function(client){

        client.on("user:waiting", function (message, next) {
            //msg = {message: message, username:username}
            client.join("waiting");
            console.log(client.user);

            next(message);
        });

        client.on("setNickAndRoom", function(nick, fn){
            fn({msg : "Hello " + nick.nick});
            client.join(nick.room);
            Room = nick.room;
            client.broadcast.to(Room).json.send({ msg: "Se conecto al room: " + nick.room, nick : nick });
        });

        client.on('message', function(message, fn){
            var msg = message; //{ message: [client.sessionId, message] };
            buffer.push(msg);
            if (buffer.length > 15)
            buffer.shift();
            client.broadcast.to(Room).json.send(msg);
            fn(msg);
        });

        client.on('disconnect', function(){
            client.broadcast.to(Room).json.send({ msg: "Se desconecto"});
        });
    });
    // nameSpace.emit('waiting', 'everyone!');
} );
//
// var buffer = [];
// io.sockets.on('connection', function(client){
//     console.log('a User Connected');
//     var Room = "";
//
//     client.on("user:waiting", function (message, callback) {
//         //msg = {message: message, username:username}
//         client.join("waiting");
//         console.log(client.user);
//     });
//
//     client.on("setNickAndRoom", function(nick, fn){
//         fn({msg : "Hello " + nick.nick});
//         client.join(nick.room);
//         Room = nick.room;
//         client.broadcast.to(Room).json.send({ msg: "Se conecto al room: " + nick.room, nick : nick });
//     });
//
//     client.on('message', function(message, fn){
//         var msg = message; //{ message: [client.sessionId, message] };
//         buffer.push(msg);
//         if (buffer.length > 15)
//         buffer.shift();
//         client.broadcast.to(Room).json.send(msg);
//         fn(msg);
//     });
//
//     client.on('disconnect', function(){
//         client.broadcast.to(Room).json.send({ msg: "Se desconecto"});
//     });
//
// });

http.listen(port);
