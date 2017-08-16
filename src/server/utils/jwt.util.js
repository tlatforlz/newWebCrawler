'use strict';
var jwt = require('jsonwebtoken');

module.exports = {
  signToken: sign
};

function sign(information) {
  var token = jwt.sign(information, process.env.SECRET_KEY);
  return token;
};
