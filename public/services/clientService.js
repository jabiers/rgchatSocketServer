angular.module('rgchat.client').
factory('mySocket', function (socketFactory) {
  return socketFactory();
});
