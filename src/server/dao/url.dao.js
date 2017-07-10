var Url = require('./../model/url.model');
var successMessage = require('./../services/successMessage');
var failMessage = require('./../services/failMessage');

module.exports = {
  createUrl: createUrl,
  getAllUrl: getAllUrl,
  getUrlById: getUrlById,
  updateUrl: updateUrl,
  deleteUrl: deleteUrl
};

function createUrl(request) {
  var newUrl = new Url({
    title: request.title,
    hostname: request.hostname,
    path: request.path
  });
  return Url.findOne({
      hostname: request.hostname
    }).exec()
    .then(function (url) {
      if (url != null) {
        return Promise.reject({
          message: failMessage.url.dupplicate
        });
      }
      return newUrl.save().then(function (err) {
        return Promise.resolve({
          message: successMessage.url.create
        });
      });
    });
}

function getAllUrl() {
  return Url.find().exec()
    .then(function (urls) {
      if (urls.length === 0) {
        return Promise.reject({
          message: failMessage.url.notFound
        });
      }
      return Promise.resolve({
        message: successMessage.url.getAll,
        urls: urls
      });
    });
}

function getUrlById(request) {
  return Url.findOne({
    _id: request.id
  }).exec().then(function (url) {
    if (url === null) {
      return Promise.reject({
        message: failMessage.url.notFound
      });
    }
    return Promise.resolve({
      message: successMessage.url.get,
      url: url
    });
  });
}

function updateUrl(request) {
  return Url.findById({
    _id: request.id
  }).exec().then(function (url) {
    if (url === null) {
      return Promise.reject({
        message: failMessage.url.notFound
      });
    }

    if (request.title !== undefined && request.title !== '') {
      url.title = request.title;
    }
    if (request.hostname !== undefined && request.hostname !== '') {
      url.hostname = request.hostname;
    }
    if (request.path !== undefined && request.path.length !== 0) {
      url.path = request.path;
    }
    return Url.findOne({
      _id: {
        $ne: request.id
      },
      hostname: url.hostname
    }).exec().then(function (urls) {
      if (urls === null) {
        return url.save().then(function () {
          return Promise.resolve({
            message: successMessage.url.update,
            url: url
          });
        });
      }
      return Promise.reject({
        message: failMessage.url.dupplicate
      });
    });
  })
}

function deleteUrl(request) {
  return Url.findByIdAndRemove({
    _id: request.id
  }).exec().then(function (err) {
    if (!err) {
      return Promise.reject({
        message: failMessage.url.notFound
      });
    }
    return Promise.resolve({
      message: successMessage.url.delete
    });
  });
}
