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

var nameSpaces = ['/aaaa', '/bbbb', '/syno'];
var users = {};
nameSpaces.forEach(function (nsp) {
    console.log(nsp);
    var nameSpace = io.of(nsp);
    var Room;
    nameSpace.on('connection', function (client) {
        client.on("client connected", function (data, next) {
            //사용자가 접속했다는 정보를 받음
            //msg = {message: message, username:username}
            var clientid = client.id;
            if (client.id.split('#')[1] !== undefined) {
                clientid = client.id.split('#')[1];
            }

            client.clientid = clientid;

            var chatHistory = {
                channel: data.channel,
                clientid: clientid,
                username: data.username
            };

            chatController.create(chatHistory, function(err, chatHistory){
                console.log("after created");
                if (err) {
                    console.log(err);
                }
                client.chathistoryid = chatHistory._id;
                users[client.chathistoryid] = client;

                io.emit('client connected', chatHistory);
                if (next) {
                    next(data);
                }
            });

        });
        client.on("send message to agent from client", function (data, next) {
            //사용자가 상담을 하기 위해 글을 남김
            //글만 남겼을 경우?
            //연결된 상담원이 있을 경우?
            // {message: message, username:username}

            var chat = {
                username: data.username,
                message: data.message,
                chathistoryid: client.chathistoryid
            };

            chatController.addChat(chat, function(err, chat){
                console.log(chat);
                console.log("asdfljksfdjklsdf");
                if (err) {
                    console.log(err);
                }
                io.emit('receive message from client', chat);

            });
            console.log("메세지를 받았다. 그래서 상담사들한테 메시지를 보낸다.");

            if (next) {
                next(data);
            }
            // pushMessages(res.username, res.message);
        });

        client.on('disconnect', function () {
            //사용자의 접속이 완료됨

            chatController.finishChat(client.chathistoryid, function() {
                delete users[client.id];
            });



            //관련 어드민에게만 보내야함
            io.emit('client disconnected', {});

        });
    });
    // nameSpace.emit('waiting', 'everyone!');
});
//
// var buffer = [];
io.sockets.on('connection', function (client) {
    var Room = "";

    //현재 유저들의 정보 (및 기존 저장된 정보를 보내줘야함)
    //현재부터 연결된 사용자만 보여주자 끝난 경우 저장된 정보를 보여주도록 하자

    client.on("send message to client", function (data, next) {
        //data 에 있는 target 정보를 통해서 emit 해야함

        var chat = {
            username: data.agentname,
            message: data.message,
            chathistoryid: data.chathistoryid
        };

        chatController.addChat(chat, function(err, chat){
            console.log(chat);
            if (err) {
                console.log(err);
            }
            if (users[data.chathistoryid]) {
                users[data.chathistoryid].emit('receive message from agent', chat);
            }

            console.log("send message to client");
            if (next) {
                next(chat);
            }

        });
        //io.of('/syno').sockets[data.selectedClientId].emit('admin:connect agent', data);
        // mySocket.on("admin:connect agent", function(res) {
        //     pushMessages(res.username, "'님'과 상담을 시작합니다.");
        // });

    });


    client.on("get connected users", function (data, next) {
        //연결된 사용자 정보를 업데이트 한다.
        //연결된 agent 의 채널의 사용자만 넘긴다.

        var connectedUsers = [];
        for (var id in users) {
            if (1) { // TODO : 내가 허용된 채널일 경우
                connectedUsers.push(users[id].info);
            }
        }

        if (next) {
            console.log('get connected users');
            next(connectedUsers);
        }
    });

    client.on('disconnect', function () {
        //관리자가 종료되면... 할게 잇나??
        client.broadcast.to(Room).json.send({msg: "Se desconecto"});
    });

});

http.listen(port);
