var express = require('express');
module.exports = function(app){

    app.use(express.static('public'));
    app.use(express.static(__dirname + '../public'));
    app.use('/angular', express.static(__dirname + '../node_modules/angular'));
    app.use('/jquery', express.static(__dirname + '../node_modules/jquery'));
    app.use('/bootstrap', express.static(__dirname + '../node_modules/bootstrap'));
    app.use('/lodash', express.static(__dirname + '../node_modules/lodash'));
    app.use('/scripts', express.static(__dirname + '../public/src/scripts'));

    return app;
}();
