var jwt = require('jsonwebtoken');
module.exports = {
  authentication: authentication
}

function authentication(req, res, next) {
  //var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("error");
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
}
