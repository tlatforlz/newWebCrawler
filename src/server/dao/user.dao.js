'use strict';
var User = require('./../model/user.model');
var cryptoPasswordUtil = require('./../utils/crypto-password.util');
var successMessage = require('../services/successMessage');
var failMessage = require('../services/failMessage');
var jwtDecode = require('jwt-decode');

module.exports = {
  createUser: createUser,
  changePasswordUser: changePasswordUser,
  updateUser: updateUser,
  convertUserModelToUserResponse: convertUserModelToUserResponse
};

function convertUserModelToUserResponse(userModel) {
  var userObj = userModel.toObject();
  delete userObj.password;
  delete userObj.salt;
  return userObj;
}

function createUser(request) {
  var password = cryptoPasswordUtil.cryptoPassword(request.password);
  return User.findOne({
      email: request.email
    }).then((user) => {
      if (user) {
        return Promise.reject({
          statusCode: 400,
          message: failMessage.user.signup.duplicateUser
        });
      }
      var newUser = User({
        email: request.email,
        password: password.hash,
        salt: password.salt,
        username: request.username,
        firstname: request.firstname,
        lastname: request.lastname,
        image: request.image,
        birthday: request.birthday,
        gender: request.gender,
        position: request.position,
        address: request.address,
        phone: request.phone,
        roles: request.roles
      });
      return newUser.save()
        .then((response) => {
          return Promise.resolve({
            message: successMessage.user.signup,
            user: convertUserModelToUserResponse(response)
          })

        }).catch(() => {
          return Promise.reject({
            message: failMessage.user.signup.systemErr
          });
        });
    })
    .catch((err) => {
      return Promise.reject({
        statusCode: 400,
        message: failMessage.user.register.systemErr
      });
    });
}

function updateUser(id, user, callback) {
  return User.findByIdAndUpdate(id, user).exec()
    .then((result) => result)
    .catch((err) => err)
}

function changePasswordUser(request) {

  var token = request.token;
  var decoded = jwtDecode(token);
  var _id = decoded._id;
  console.log(decoded);
  return User.findById({
      _id: _id
    })
    .then((user) => {
      if (user) {
        console.log("user")
        if (cryptoPasswordUtil.verifyPassword(user.password, user.salt, request.passwordOld)) {
          var passwordNew = cryptoPasswordUtil.cryptoPassword(request.passwordNew);
          user.password = passwordNew.hash;
          user.salt = passwordNew.salt;
          //console.log(passwordNew);
          return user.save()
            .then((res) => {
              console.log(successMessage.user.changePassword)
              return Promise.resolve({
                message: successMessage.user.changePassword
              })
            })
            .catch((err) => {
              return Promise.reject((err) => {
                next(err)
              })
            })
        } else {
          return Promise.reject({
            message: failMessage.user.changePassword.passwordOldNotCorrect
          })
        }
      }
    })
    .catch((err) => {
      return Promise.reject((err))
    })
}
