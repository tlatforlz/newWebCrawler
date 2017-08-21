var Spider = require('./../model/spider.model');
var NewsDao = require('./news.dao.js');
var successMessage = require('./../services/successMessage');
var failMessage = require('./../services/failMessage');
var ListSpider = require('./../services/spider');
var News = require('./../model/news.model');
var async = require('async');

module.exports = {
  createSpider: createSpider,
  getAllSpider: getAllSpider,
  getSpiderById: getSpiderById,
  updateSpider: updateSpider,
  deleteSpider: deleteSpider,
  callSpider: callSpider,
  updateNewsSpider: updateNewsSpider,
  callSpiderPath: callSpiderPath,
  updateNewsSpiderPath: updateNewsSpiderPath,
  callSpiderUrl: callSpiderUrl,
  updateNewsSpiderUrl: updateNewsSpiderUrl,
  testSpider: testSpider,
  getNewsCall: getNewsCall,
  getNewsNone: getNewsNone,
  countSpider: countSpider
};

//getNewsNone
function countSpider(request) {
  return Spider.find().exec()
    .then(function (res) {
      return Promise.resolve({
        spider: res.length
      })
    })
}


function getNewsNone(request) {
  return News.find({
      active: false,
      spiderId: request._id,
      content: undefined
    }).exec()
    .then(function (res) {
      console.log(res);
      return Promise.resolve({
        news: res
      })
    })
}


//getNewsNone
function getNewsNone(request) {
  return News.find({
      active: false,
      spiderId: request._id,
      content: undefined
    }).exec()
    .then(function (res) {
      console.log(res);
      return Promise.resolve({
        news: res
      })
    })
}

function getNewsCall(request) {
  return News.find({
      active: false,
      spiderId: request._id
    }).exec()
    .then(function (res) {
      console.log(res);
      return Promise.resolve({
        news: res
      })
    })
}

function testSpider(request) {
  return new Promise(function (resolve, reject) {
    ListSpider.spiderCountUpdateAll(request.crawlingName)
      .then(function (spider) {
        return resolve({
          messsage: successMessage.spider.callSpider,
          spider: spider
        });
      })
      .catch(function (err) {
        return reject({
          spider: err
        });
      })
  })

}

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
        if (spiders !== null) {
          return Promise.reject({
            message: failMessage.spider.dupplicate
          });
        }
        return spider.save().then(function (err) {
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
      return new Promise(function (resolve, reject) {
        async.series({
          length: function (callback) {
            switch (request.crawlingName) {
              case "spiderTinNongNghiep":
                ListSpider.spiderTinNongNghiep(spider.urlId, spider._id).then(function (res) {
                  callback(null, res);
                });;

              case "spiderTinNongNghiepVietNam":
                ListSpider.spiderNongNghiepVietNam(spider.urlId, spider._id).then(function (res) {
                  callback(null, res);
                });
            }
          }
        }, function (err, result) {
          return resolve({
            messsage: successMessage.spider.callSpider,
            spider: result.length
          });
        })
      });
    });
}

function updateNewsSpider(request) {
  return Spider.findOne({
      crawlingName: request.crawlingName
    })
    .exec()
    .then(function (spider) {
      if (spider === null) {
        return Promise.reject({
          message: failMessage.spider.notFound
        });
      }
      return new Promise(function (resolve, reject) {
        switch (request.crawlingName) {
          case "spiderTinNongNghiep":
            ListSpider.spiderTinNongNghiep_updateAll();
            break;
          case "spiderTinNongNghiepVietNam":
            ListSpider.spiderNongNghiepVietNam_updateAll();
            break;
        }

        async.series({
          length: function (callback) {
            ListSpider.spiderCountUpdateAll(request.crawlingName)
              .then(function (result1) {
                console.log('blabla' + result1.length);
                callback(null, result1.length);
              });
          }
        }, function (err, result) {
          return resolve({
            messsage: successMessage.spider.callSpider,
            spider: result.length
          });
        })
      });
    });
}

function callSpiderPath(request) {
  return Spider.findOne({
      crawlingName: request.crawlingName,
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
          ListSpider.spiderTinNongNghiep_path(spider.urlId, spider._id, request.catelogyId);
          break;
        case "spiderTinNongNghiepVietNam":
          ListSpider.spiderNongNghiepVietNam_path(spider.urlId, spider._id, request.catelogyId);
          break;
      }
      return Promise.resolve({
        messsage: successMessage.spider.callSpider,
        spider: spider
      });
    });
}

function updateNewsSpiderPath(request) {
  return Spider.findOne({
      crawlingName: request.crawlingName
    })
    .exec()
    .then(function (spider) {
      if (spider === null) {
        return Promise.reject({
          message: failMessage.spider.notFound
        });
      }
      switch (request.crawlingName) {
        case "spiderTinNongNghiep":
          ListSpider.spiderTinNongNghiep_updatePath(request.catelogyId);
          break;
        case "spiderTinNongNghiepVietNam":
          ListSpider.spiderNongNghiepVietNam_updatePath(request.catelogyId);
          break;
      }
      return Promise.resolve({
        messsage: successMessage.spider.callSpider,
        spider: spider
      });
    });
}


function callSpiderUrl(request) {
  return News.findOne({
    originalLink: request.url
  }).exec().then(function (upNews) {
    if (upNews !== null) {
      return Promise.reject({
        message: failMessage.spider.urlDupplicate
      });
    }
    return Spider.findOne({
        crawlingName: request.crawlingName,
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
            ListSpider.spiderTinNongNghiep_Url(spider.urlId, spider._id, request.url);
            break;
          case "spiderTinNongNghiepVietNam":
            ListSpider.spiderNongNghiepVietNam_Url(spider.urlId, spdier._id, request.url);
            break;
        }
        return Promise.resolve({
          messsage: successMessage.spider.callSpider,
          spider: spider
        });
      });
  });

}


function updateNewsSpiderUrl(request) {
  return Spider.findOne({
      crawlingName: request.crawlingName
    })
    .exec()
    .then(function (spider) {
      if (spider === null) {
        return Promise.reject({
          message: failMessage.spider.notFound
        });
      }
      switch (request.crawlingName) {
        case "spiderTinNongNghiep":
          ListSpider.spiderTinNongNghiep_updateUrl(request.url);
          break;
        case "spiderTinNongNghiepVietNam":
          ListSpider.spiderNongNghiepVietNam_updateUrl(request.url);
          break;
      }
      return Promise.resolve({
        messsage: successMessage.spider.callSpider,
        spider: spider
      });
    });
}
