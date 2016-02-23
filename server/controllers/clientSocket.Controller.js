var chatController = require('./server/controllers/chatHistory.Controller');

module.exports = function (io, client, users) {
    client.on("client connected", function (data, next) {
        //사용자가 접속했다는 정보를 받음
        //msg = {message: message, username:username}

        client.clientid = clientid;

        var chatHistory = {
            channelId: data.channelId,
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
}
