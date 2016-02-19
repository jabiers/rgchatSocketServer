angular.module('rgchat.client').controller('clientCtrl', clientCtrl);

function clientCtrl($location, $filter, mySocket) {

    var vm = this;
    var token = $location.search().token;
    var socket;
    var socketConnected = false;

    vm.messages = [
        {
            'username': 'System',
            'content': token + "입니다. 궁금한 점을 물어보세요."
        }
    ];

    vm.username = '손님';

    vm.sendMessage = function(message, username) {

        if(message && message !== '' && username) {
            if (!socketConnected) {
                socketConnect();
            }

            mySocket.emit("send message to agent from client", {message: message, username:username}, function (res) {
                pushMessages(res.username, res.message);
            });
        }
    };

    function socketConnect() {
        if (!socketConnected) {
            socket = mySocket.connect('/' + token);

            socket.user = {
                isClient:true,
                username:vm.username,
                channel:token
            };
            socketConnected = true;

            mySocket.emit("client connected", socket.user, function(res) {
                // pushMessages(res.username, res.message);
            });

        } else {
            //Connected
        }
        setSocketHandlers();

        function setSocketHandlers() {
            mySocket.on("connected agent", function(res) {
                console.log(res);
                //상담원이 접속했을 때
                pushMessages("", res.agentname + "님과 상담을 시작합니다.");
            });

            mySocket.on("typing agent", function(res) {
                //상담원이 글을 쓰는 중일 때
                console.log(res);
            });

            mySocket.on("typing cancel", function(res) {
                //상담원이 글을 쓰다가 취소했을 때
                console.log(res);

            });

            mySocket.on("receive message from agent", function(res) {
                //상담원이 나에게 글을 남겼을 때
                console.log(res);
                pushMessages(res.username, res.message);
            });

            mySocket.on("finish advice with agent", function(res) {
                //상담원과 상담이 종료되었을 때
                console.log(res);

            });

        }
    }
    vm.visible = true;
    vm.expandOnNew = true;

    function pushMessages(username, message) {
        vm.messages.push({
            'username': username,
            'content': message
        });

    }
}
