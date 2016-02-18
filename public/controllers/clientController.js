angular.module('rgchat').controller('clientCtrl', clientCtrl);

function clientCtrl($location, mySocket) {

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
                socket = mySocket.connect('/' + token);
                socket.user = {isClient:true, username:username};
                socketConnected = true;
            }

            mySocket.emit("user:waiting", {message: message, username:username} , function(res) {
                pushMessages(res.username, res.message);
            });
        }
    };

    vm.visible = true;
    vm.expandOnNew = true;

    function pushMessages(username, message) {
        vm.messages.push({
            'username': username,
            'content': message
        });

        console.log('푸시 된거지');
    }
}
