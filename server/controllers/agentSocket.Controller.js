var chatController = require('./server/controllers/chatHistory.Controller');

module.exports = function (client) {

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


    //-------------------------------- 일단 사용안함  --------------------------------

    //
    // client.on("get connected users", function (data, next) {
    //     //연결된 사용자 정보를 업데이트 한다.
    //     //연결된 agent 의 채널의 사용자만 넘긴다.
    //
    //     var connectedUsers = [];
    //     for (var id in users) {
    //         if (1) { // TODO : 내가 허용된 채널일 경우
    //             connectedUsers.push(users[id].info);
    //         }
    //     }
    //
    //     if (next) {
    //         console.log('get connected users');
    //         next(connectedUsers);
    //     }
    // });
    //
    // client.on('disconnect', function () {
    //     //관리자가 종료되면... 할게 잇나??
    //     // client.broadcast.to(Room).json.send({msg: "Se desconecto"});
    // });

}
