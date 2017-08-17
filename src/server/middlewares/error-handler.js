exports.errorHandler = function () {
  return function (err, req, res, next) {
    if (err) {
      res.status(err.statusCode || 500).send({
        message: err.message
      })
    }
  }
};
