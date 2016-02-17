angular.module('app').controller('clientCtrl', clientCtrl);

function clientCtrl() {

    var vm = this;
    
    vm.messages = [
        {
            'username': 'username1',
            'content': 'Hi!'
        },
        {
            'username': 'username2',
            'content': 'Hello!'
        },
        {
            'username': 'username2',
            'content': 'Hello!'
        },
        {
            'username': 'username2',
            'content': 'Hello!'
        },
        {
            'username': 'username2',
            'content': 'Hello!'
        },
        {
            'username': 'username2',
            'content': 'Hello!'
        }
    ];

    vm.username = 'username1';

    vm.sendMessage = function(message, username) {
        if(message && message !== '' && username) {
            vm.messages.push({
                'username': username,
                'content': message
            });
        }
    };
    vm.visible = true;
    vm.expandOnNew = true;
}
