module.exports = function(){
    var express = require('express');
    var app = express();
    var chatApi = require('../server/controllers/chatApi.Controller');

    app.get('/chatHistoryById/:id', chatApi.getChatHistoryById);
    app.get('/chatHistoryByChannelId/:channelId', chatApi.getChatHistoryByChannelId);
    app.get('/chatHistoryByClientId/:clientId', chatApi.getChatHistoryByClientId);
    app.get('/chatHistoryByAgentId/:agentId', chatApi.getChatHistoryByAgentId);

    return app;

}();
