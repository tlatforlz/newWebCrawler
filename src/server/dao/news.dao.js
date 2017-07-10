var News = require('./../model/news.model');
var successMessage = require('./../services/successMessage');
var failMessage = require('./../services/failMessage');

module.exports = {
  createNews: createNews,
  getAllNews: getAllNews,
  getNewsById: getNewsById,
  updateNews: updateNews,
  deleteNews: deleteNews
};

function createNews(request) {
  var news = new News({
    title: request.title,
    description: request.description,
    content: request.content,
    image: request.image,
    author: request.author,
    originalLink: request.originaLink,
    spiderId: request.spiderId,
    categoryId: request.categoryId,
    createDate: Date.now(),
    updateDate: Date.now()
  });
  return News.findOne({
    title: request.title
  }).exec().then(function (New) {
    if (New !== null) {
      return Promise.reject({
        message: failMessage.news.dupplicate
      });
    }
    return news.save().then(function (err) {
      return Promise.resolve({
        message: successMessage.news.create
      });
    });
  });
}

function getAllNews() {
  return News.find().exec()
    .then(function (newss) {
      if (newss.length === 0) {
        return Promise.reject({
          message: failMessage.news.notFound
        });
      }
      return Promise.resolve({
        message: successMessage.news.getAll,
        news: newss
      });
    });
}

function getNewsById(request) {
  return News.findOne({
    _id: request.id
  }).exec().then(function (news) {
    if (news === null) {
      return Promise.reject({
        message: failMessage.news.notFound
      });
    }
    return Promise.resolve({
      message: successMessage.news.get,
      news: news
    });
  });
}

function updateNews(request) {
  return News.findById({
      _id: request.id
  }).exec().then(function (news) {
    if (news === null) {
      return Promise.reject({
        message: failMessage.news.notFound
      });
    }
    if (request.title !== undefined && request.title !== '') {
      news.title = request.title;
    }
    if (request.description !== undefined && request.description !== '') {
      news.description = request.description;
    }
    if (request.content !== undefined && request.content !== '') {
      news.content = request.content;
    }
    if (request.image !== undefined && request.image !== '') {
      news.image = request.image;
    }
    if (request.author !== undefined && request.author !== '') {
      news.author = request.author;
    }
    if (request.originalLink !== undefined && request.originalLink !== '') {
      news.originalLink = request.originalLink;
    }
    if (request.spiderId !== undefined && request.spiderId !== '') {
      news.spiderId = request.spiderId;
    }
    if (request.categoryId !== undefined && request.categoryId !== '') {
      news.categoryId = request.categoryId;
    }
    news.updateDate = Date.now();
    return News.findOne({
        title: request.title,
        _id: {
            $ne: request.id
        }
    }).exec().then(function (New) {
      if (New !== null) {
        return Promise.reject({
          message: failMessage.news.dupplicate
        });
      }
      return news.save().then(function (err) {
        return Promise.resolve({
          message: successMessage.news.update,
          news: news
        });
      });
    });
  });
}

function deleteNews(request) {
  return News.findByIdAndRemove({
    _id: request.id
  }).exec().then(function (err) {
    if (!err) {
      return Promise.reject({
        message: failMessage.news.notFound
      });
    }
    return Promise.resolve({
      message: successMessage.news.delete
    });
  });
}
