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

                pushMessages('System', '\'' + vm.username + '\'님이 접속하셨습니다.');
            }

            socket.emit("user:waiting", {message: message, username:username} , function(res) {
                // $("#board").append("<p>" + Nickname + ": " + msg + "</p>");
                console.log(res);
                pushMessages(res.username, res.message);

            });
        }

        // socket.on('connect',function (data) {
        //     console.log('connect');
        //     mySocket.emit('setNickAndRoom', {nick: vm.username, room: 'aa'}, function(response){
        //         vm.messages.push({
        //             'username': 'System',
        //             'content': vm.username + '님이 접속하셨습니다.'
        //         });
        //     });
        // });
        //mensajes
        // socket.on("message", function(msg, p, c){
        //     vm.messages.push({
        //         'username': msg.username,
        //         'content': msg.content
        //     });
        // });
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
