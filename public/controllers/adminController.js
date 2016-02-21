angular.module('rgchat.admin').controller('adminCtrl', adminCtrl);

function adminCtrl($http, mySocket) {

    var vm = this;
    var socketConnected = false;
    var socket;
    vm.messages = [];

    vm.agentname = '관리자';
    vm.chatHistory = [];
    vm.chatHistoryId;
    socketConnect();


    $http({
        method: "GET",
        url: "/api/chatHistoryByAgentId/" + "syno" // TODO : 인증을 통해서 가져와야 함
    }).then(function mySucces(response) {
        vm.chatHistory.splice(0, vm.messages.length);
        for (var val in response.data) {
            vm.chatHistory.push(response.data[val]);
        }
        console.log(vm.chatHistory);

    }, function myError(response) {
        console.log(response);
    });

    vm.selectUser = function (chatHistory) {
        console.log(chatHistory);
        console.log(chatHistory._id);
        vm.chatHistoryId = chatHistory._id;
        $http({
            method: "GET",
            url: "/api/chatHistoryById/" + chatHistory._id
        }).then(function mySucces(response) {
            console.log(response);
            vm.messages.splice(0, vm.messages.length);
            for (var val in response.data[0].chats) {
                vm.messages.push(response.data[0].chats[val]);
            }
            console.log(vm.messages);
        }, function myError(response) {
            console.log(response);
        });

    };

    vm.sendMessage = function (message, agentname) {
        console.log('send message');
        if (message && message !== '' && agentname) {
            console.log('aa');
            //target 설정이 필요함 서버로 emit 만 되고 타겟에 대한 socket 을 다시 날림
            mySocket.emit("send message to client", {message: message, agentname: agentname}, function (res) {
                console.log(res);
            });
        }
    };

    function socketConnect() {
        if (!socketConnected) {
            socket = mySocket.connect('http://localhost:3000');
            socketConnected = true;
        } else {
            //Connected
        }
        //mySocket.emit("get connected users", {}, function (data) {
        //    console.log(data);
        //    vm.users = data;
        //});

        setSocketHandler();

        function setSocketHandler() {

            mySocket.on("receive message from client", function (data) {
                console.log(data);
                console.log(vm.chatHistoryId + " and " + data.chathistoryid);
                if (vm.chatHistoryId == data.chathistoryid) {
                    vm.messages.push(data);
                }

                console.log(arrayObjectIndexOf(vm.chatHistory, data.chathistoryid, "_id"));
                vm.chatHistory[arrayObjectIndexOf(vm.chatHistory, data.chathistoryid, "_id")].chats.push(data);
                vm.chatHistory[arrayObjectIndexOf(vm.chatHistory, data.chathistoryid, "_id")].lastmessage = data.message;

                // pushMessages(res.username, res.message);
            });

            mySocket.on("client connected", function (data) {
                //사용자가 접속되었다.
                //사용자 리스트에 추가할 필요가 있다.
                console.log("client connected");
                console.log(data);
                vm.chatHistory.splice(0, 0, data);
            });

            mySocket.on("client disconnected", function (data) {
                //사용자의 접속이 끊겼다.
                //사용자 리스트에 추가할 필요가 있다.
                //var obj = vm.chatHistory[arrayObjectIndexOf(vm.chatHistory, data._id, "_id")];
                //vm.chatHistory.splice(arrayObjectIndexOf(vm.chatHistory, data._id, "_id"), 1);
                //obj.id = undefined;
                //vm.chatHistory.push(obj);
                console.log(data);
            });

        }
    }

    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for (var i = 0, len = myArray.length; i < len; i++) {

            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }
}
