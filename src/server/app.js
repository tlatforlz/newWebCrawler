/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();
var db = require('./db/db.config');
var config = require('./config');
var mongoose = require('mongoose');
var environment = process.env.NODE_ENV;
var errorHandler = require('./middlewares/error-handler');
process.env.SECRET_KEY = 'tranleanhthe';
app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use(config.BASE_URL + '/url', require('./routes/url.routes')());
app.use(config.BASE_URL + '/spider', require('./routes/spider.routes')());
app.use(config.BASE_URL + '/category', require('./routes/category.routes')());
app.use(config.BASE_URL + '/news', require('./routes/news.routes')());
app.use(config.BASE_URL + '/archive', require('./routes/archive.routes')());
app.use(config.BASE_URL + '/user', require('./routes/user.routes')());
app.use(config.BASE_URL + '/auth', require('./routes/auth.routes')());
console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function (req, res, next) {
      four0four.send404(req, res);
    });
    // Invalid calls to assets should return the custom error object to mitigate
    // against XSS reflected attacks
    app.use('/js/*', function (req, res, next) {
      four0four.send404(req, res);
    });
    app.use('/images/*', function (req, res, next) {
      four0four.send404(req, res);
    });
    app.use('/styles/*', function (req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function (req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./src/client/index.html'));
    break;
}
app.use(errorHandler.errorHandler());
app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});
