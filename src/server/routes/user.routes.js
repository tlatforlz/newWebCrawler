var router = require('express').Router();
var userDao = require('./../dao/user.dao');
var middleware_jwt = require("../middlewares/jwt-parser");
var failMessage = require('../services/failMessage');

module.exports = function () {

  router.post('/', createUser);
  router.post('/change', middleware_jwt.authentication, changePasswordUser);
  router.get('/', getUser);

  function getUser(req, res) {

  }

  function changePicture(req, res) {
    var id = req.decoded._id;
    var user = {
      image: req.profileImageURL
    }
    userDao.updateUser(id, user)
      .then((result) => res.status(200).send({
        image: req.profileImageURL
      }).end())
      .catch((err) => next(err))
  }

  function createUser(req, res, next) {
    var request = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    };

    if (!request.email || !request.password || !request.role) {
      res.status(403).send(failMessage.user.create.input).end();
    }
    userDao.createUser(request)
      .then((res) => {
        res.status(200).send(response).end()
      }).catch((err) => {
        next(err);
      });
  }

  function changePasswordUser(req, res, next) {
    var request = {
      passwordOld: req.body.passwordOld,
      passwordNew: req.body.passwordNew,
      token: req.body.token || req.query.token || req.headers['x-access-token']
    };

    if (request.passwordOld == "" || request.getPasswordNew == "") {
      console.log("403")
      return res.status(403).send(failMessage.user.changePassword.input).end()
    }
    userDao.changePasswordUser(request)
      .then((response) => {
        console.log(response)
        res.status(200).send(response).end()
      }).catch((err) => {
        next(err);
      })
  }

  return router;
};
