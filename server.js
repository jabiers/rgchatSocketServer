var port = process.env.PORT || 3000;
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var redis = require('socket.io-redis');
io.adapter(redis({ host: 'syno.ml', port: 6379 }));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

var nameSpaces = ['/aaaa', '/bbbb'];

nameSpaces.forEach(function(nsp) {
    console.log(nsp);
    var nameSpace = io.of(nsp);
    nameSpace.on('connection', function(client){
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
    nameSpace.emit('waiting', 'everyone!');
} );

var buffer = [];
io.sockets.on('connection', function(client){
    var Room = "";
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

server.listen(port);
