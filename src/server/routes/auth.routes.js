var router = require('express').Router();
var authDao = require('./../dao/auth.dao');

module.exports = function () {

  router.post('/signin', signin);

  function signin(req, res, next) {
    var request = {
      email: req.body.email,
      password: req.body.password
    }
    authDao.signin(request).then(function (auth) {
        res.status(200).send(auth).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }
  return router;
};
