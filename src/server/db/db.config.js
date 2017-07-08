var config = require('./../config');
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + config.mongodb.host + '/' + config.mongodb.database);
/* "host": "admin:1234567@ds149511.mlab.com:49511",*/