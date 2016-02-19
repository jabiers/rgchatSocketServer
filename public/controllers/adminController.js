angular.module('rgchat.admin').controller('adminCtrl', clientCtrl);

function clientCtrl($location, mySocket) {

    var vm = this;
    var socketConnected = false;
    var socket;
    vm.messages = [
        {
            'username': 'System',
            'content': "대기중인 손님입니다."
        }
    ];
    vm.clientId;
    vm.agentname = '관리자';
    vm.users = [];


    socketConnect();
    vm.selectUser = function(user) {
        console.log(user);
    };

    vm.sendMessage = function(message, agentname) {
        console.log('send message');
        if(message && message !== '' && agentname) {
            console.log('aa');
            //target 설정이 필요함 서버로 emit 만 되고 타겟에 대한 socket 을 다시 날림
            mySocket.emit("send message to client", {message: message, agentname:agentname} , function(res) {
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
        mySocket.emit("get connected users", {}, function(data) {
            console.log(data);
            vm.users = data;
        });

        setSocketHandler();

        function setSocketHandler() {

            mySocket.on("receive message from client", function(data) {
                console.log("receive message from client");
                console.log(data);

                console.log(vm.users);

                vm.users[arrayObjectIndexOf(vm.users, data.id, "id")] = data.info;

                // pushMessages(res.username, res.message);
            });

            mySocket.on("client connected", function(data) {
                //사용자가 접속되었다.
                //사용자 리스트에 추가할 필요가 있다.
                console.log(data);
                vm.users.splice(0, 0, data);
            });

            mySocket.on("client disconnected", function(data) {
                //사용자의 접속이 끊겼다.
                //사용자 리스트에 추가할 필요가 있다.
                var obj = vm.users[arrayObjectIndexOf(vm.users, data.id, "id")];
                vm.users.splice(arrayObjectIndexOf(vm.users, data.id, "id"), 1);
                obj.id = undefined;
                vm.users.push(obj);
                console.log(data);
                // vm.users.push(data);
            });

        }
    }
    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for(var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }
}
