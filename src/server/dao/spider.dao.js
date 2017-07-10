var Spider = require('./../model/spider.model');
var NewsDao = require('./news.dao.js');
var successMessage = require('./../services/successMessage');
var failMessage = require('./../services/failMessage');
var ListSpider = require('./../services/spider');

module.exports = {
  createSpider: createSpider,
  getAllSpider: getAllSpider,
  getSpiderById: getSpiderById,
  updateSpider: updateSpider,
  deleteSpider: deleteSpider,
  callSpider: callSpider
};

function createSpider(request) {
  var newSpider = new Spider({
    urlId: request.urlId,
    name: request.name,
    crawlingName: request.crawlingName
  });
  return Spider.findOne({
      $or: [{
        crawlingName: request.crawlingName
      }, {
        name: request.name
      }]
    }).exec()
    .then(function (spider) {
      if (spider !== null) {
        return Promise.reject({
          message: failMessage.spider.dupplicate
        });
      }
      return newSpider.save().then(function (err) {
        return Promise.resolve({
          message: successMessage.spider.create
        });
      });
    });
}

function getAllSpider() {
  return Spider.find().exec()
    .then(function (spiders) {
      if (spiders.length === 0) {
        return Promise.reject({
          message: failMessage.spider.notFound
        });
      }
      return Promise.resolve({
        message: successMessage.spider.getAll,
        spiders: spiders
      });
    });
}

function getSpiderById(request) {
  return Spider.findOne({
    _id: request.id
  }).exec().then(function (spider) {
    if (spider === null) {
      return Promise.reject({
        message: failMessage.spider.notFound
      });
    }
    return Promise.resolve({
      message: successMessage.spider.get,
      spider: spider
    });
  });
}

function updateSpider(request) {
  return Spider.findById({
    _id: request.id
  }).exec().then(function (spider) {
    if (spider === null) {
      return Promise.reject({
        message: failMessage.spider.notFound
      });
    }
    if (request.urlId !== undefined && request.urlId !== '') {
      spider.urlId = request.urlId;
    }
    if (request.name !== undefined && request.name !== '') {
      spider.name = request.name;
    }
    if (request.isSourceUpdated !== undefined && request.isSourceUpdated !== '') {
      spider.isSourceUpdated = request.isSourceUpdated;
    }
    if (request.isActive !== undefined && request.isActive !== '') {
      spider.isActive = request.isActive;
    }
    if (request.crawlingName !== undefined && request.crawlingName !== '') {
      spider.crawlingName = request.crawlingName;
    }
    spider.updateDate = Date.now();
    return Spider.findOne({
        _id: {
          $ne: request.id
        },
        $or: [{
          crawlingName: request.crawlingName
        }, {
          name: request.name
        }]
      }).exec()
      .then(function (spiders) {
        console.log(spider);
        if (spiders !== null) {
          console.log("log herre");
          return Promise.reject({
            message: failMessage.spider.dupplicate
          });
        }
        return spider.save().then(function (err) {
          console.log(err);
          return Promise.resolve({
            message: successMessage.spider.update,
            spider: spider
          });
        });
      });
  });
}

function deleteSpider(request) {
  return Spider.findByIdAndRemove({
    _id: request.id
  }).exec().then(function (err) {
    if (!err) {
      return Promise.reject({
        message: failMessage.spider.notFound
      });
    }
    return Promise.resolve({
      message: successMessage.spider.delete
    });
  });
}

function callSpider(request) {
  return Spider.findOne({
      crawlingName: request.crawlingName
    })
    .populate('urlId')
    .exec()
    .then(function (spider) {
      if (spider === null) {
        return Promise.reject({
          message: failMessage.spider.notFound
        });
      }

      switch (request.crawlingName) {
        case "spiderTinNongNghiep":
          ListSpider.spiderTinNongNghiep(spider.urlId, spider._id);
          break;
      }
      return Promise.resolve({
        messsage: successMessage.spider.callSpider,
        spider: spider
      });
    });
}
