var user = require('./../model/user.model');
var cryptoPasswordUtil = require('./../utils/crypto-password.util');
var jwt = require('./../utils/jwt.util');
var successMessage = require('./../services/successMessage');
var failMessage = require('./../services/failMessage');
var userDao = require('.././dao/user.dao');
var jwtDecode = require('jwt-decode');


module.exports = {
  signin: signin
};

function signin(request, callback) {
  console.log(request);

  return user.findOne({
    email: request.email
  }).exec().then(function (user) {
    if (!user) {
      return Promise.reject({
        statusCode: 404,
        message: failMessage.user.login.notFound
      });
    }

    if (cryptoPasswordUtil.verifyPassword(user.password, user.salt, request.password)) {
      var token = jwt.signToken(userDao.convertUserModelToUserResponse(user));
      return Promise.resolve({
        message: successMessage.user.login,
        'email': userDao.convertUserModelToUserResponse(user),
        'token': token
      });

    } else {
      return Promise.reject({
        message: failMessage.user.login.inCorrect
      });
    }
  });
}
