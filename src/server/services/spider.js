var request = require("request");
var cheerio = require("cheerio");
var Spider = require('../dao/spider.dao');
var newsDao = require('../dao/news.dao');
var News = require('./../model/news.model');
var SpiderModel = require('./../model/spider.model');
var async = require('async');

module.exports = {
  spiderCountUpdateAll: spiderCountUpdateAll,

  spiderTinNongNghiep: spiderTinNongNghiep,
  spiderTinNongNghiep_updateAll: spiderTinNongNghiep_updateAll,
  spiderTinNongNghiep_path: spiderTinNongNghiep_path,
  spiderTinNongNghiep_updatePath: spiderTinNongNghiep_updatePath,
  spiderTinNongNghiep_Url: spiderTinNongNghiep_Url,
  spiderTinNongNghiep_updateUrl: spiderTinNongNghiep_updateUrl,

  spiderNongNghiepVietNam: spiderNongNghiepVietNam,
  spiderNongNghiepVietNam_path: spiderNongNghiepVietNam_path,
  spiderNongNghiepVietNam_Url: spiderNongNghiepVietNam_Url,
  spiderNongNghiepVietNam_updateAll: spiderNongNghiepVietNam_updateAll,
  spiderNongNghiepVietNam_updateUrl: spiderNongNghiepVietNam_updateUrl,
  spiderNongNghiepVietNam_updatePath: spiderNongNghiepVietNam_updatePath
}

function spiderCountUpdateAll(crawlingName) {
  return SpiderModel.findOne({
      crawlingName: crawlingName
    })
    .populate('urlId')
    .exec()
    .then(function (spiderN) {
      console.log('spider ' + spiderN);
      if (spiderN === null) {
        message: failMessage.spider.notFound
      }
      var count = 0;
      var list_length = spiderN.urlId.path.length;
      var list_news = [];
      return new Promise(function (resolve, reject) {
        async.series({
          list_news: function (callback) {
            async.whilst(function () {
              return count < list_length
            }, function (next) {
              return News.find({
                  categoryId: spiderN.urlId.path[count].catelogyId,
                  active: false,
                  $or: [{
                    title: undefined
                  }, {
                    title: ""
                  }, {
                    content: undefined
                  }, {
                    author: undefined
                  }, {
                    author: ""
                  }, {
                    createDate: undefined
                  }, {
                    createDate: ""
                  }]
                })
                .exec().then(function (upNews) {
                  var index = 0;
                  async.whilst(function () {
                    return index < upNews.length
                  }, function (callback2) {
                    var check = list_news.find(o => o.originalLink === upNews[index].originalLink);
                    if (check === undefined) {
                      list_news.push(upNews[index]);
                    }
                    index++;
                    callback2();
                  }, function (err) {
                    count++;
                    next();
                  });
                });
            }, function (err) {
              callback(null, list_news);
            });
          }
        }, function (err, result) {
          return resolve({
            length: list_news.length,
            list: list_news
          });
        })
      });
    });
}

function spiderTinNongNghiep(urlId, spiderId) {
  return new Promise(function (resolve, reject) {
    var page = 0;

    async.whilst(function () {
        return page < urlId.path.length;
      },
      function (next) {
        var disUrl = urlId.hostname + urlId.path[page].namePath;
        console.log(disUrl);
        console.log(urlId.path[page]);
        getPath_spiderTinNongNghiep(disUrl, spiderId, urlId.path[page].catelogyId).then(function (res) {
          console.log('log' + res);
          page++;
          console.log(page);
          next();
        }).catch(function (err) {
          console.log(err);
        });

      },
      function (err) {
        return resolve("CALL_SUCCESS");
      });
  });
}

function spiderNongNghiepVietNam(urlId, spiderId) {
  return new Promise(function (resolve, reject) {
    var page = 0;

    async.whilst(function () {
        return page < urlId.path.length;
      },
      function (next) {
        var disUrl = urlId.hostname + urlId.path[page].namePath;
        console.log(disUrl);
        console.log(urlId.path[page]);
        getPath_spiderNongNghiepVietNam(disUrl, spiderId, urlId.path[page].catelogyId).then(function (res) {
          console.log('log' + res);
          page++;
          console.log(page);
          next();
        }).catch(function (err) {
          console.log(err);
        });

      },
      function (err) {
        return resolve("CALL_SUCCESS");
      });
  });
}

function getPath_spiderTinNongNghiep(path, spiderId, catelogyId) {
  return new Promise(function (resolve, reject) {
    if (path === undefined) {
      return resolve(true);
    }
    async.whilst(function () {
      return path !== undefined
    }, function (next) {
      async.series({
        gotoPage: function (callback) {
          request(path, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              var $ = cheerio.load(body);
              var i = 1;
              $('.post-listing .post-box-title a').each(function () {
                //#main-content > div.content > div.post-listing > article:nth-child(1)
                url = ($(this).attr('href'));
                console.log(url);
                image = $('#main-content > div.content > div.post-listing > article:nth-child(' + i + ') > div.post-thumbnail > a > img').attr('src');
                console.log('image ' + image);
                des = $('#main-content > div.content > div.post-listing > article:nth-child(' + i + ') > div.entry > p').text();
                if (image === undefined) {
                  image = null;
                } else {
                  image = image.split('-150x150').join('');
                }
                var news = new News({
                  originalLink: url,
                  spiderId: spiderId,
                  categoryId: catelogyId,
                  image: image,
                  description: des,
                  active: false
                });
                News.findOne({
                  originalLink: news.originalLink
                }, function (err, New) {
                  if (New === null) {
                    console.log('News null');
                    news.save();
                  }
                });
                i++;
              });
              gotoPage = $('#tie-next-page a').attr('href');
              if (gotoPage === undefined) {
                return resolve(true);
              }
              callback(null, gotoPage);
            }
          });
        }
      }, function (err, result) {
        path = result.gotoPage;
        next();
      });
    }, function (err) {
      return resolve(true);
    })
  });
}

function getPath_spiderNongNghiepVietNam(path, spiderId, catelogyId) {
  console.log('call pat ');
  return new Promise(function (resolve, reject) {
    if (path === undefined) {
      console.log('calllll page die ' + path);
      return resolve(true);
    }
    async.whilst(function () {
        return path !== undefined
      }, function (next) {
        async.series({
            gotoPage: function (callback) {
              request(path, function (error, response, body) {
                console.log('statusCode ' + response.statusCode);
                if (!error && response.statusCode === 200) {
                  var $ = cheerio.load(body);
                  let i = 1;
                  $('.post-listing .post-box-title a').each(function () {
                    //#wrapper > div > div.content > div.post-listing.archive-box > article:nth-child(3) > h2 > a
                    url = ($('#wrapper > div > div.content > div.post-listing.archive-box > article:nth-child(' + i + ') > h2 > a').attr('href'));
                    console.log(url);
                    //#wrapper > div > div.content > div.post-listing.archive-box > article:nth-child(2) > div.post-thumbnail > a > img
                    image = $('#wrapper > div > div.content > div.post-listing.archive-box > article:nth-child(' + i + ') > div.post-thumbnail > a > img').attr('src');
                    //#wrapper > div > div.content > div.post-listing.archive-box > article:nth-child(3) > div.entry > p
                    des = $('#wrapper > div > div.content > div.post-listing.archive-box > article:nth-child(' + i + ') > div.entry > p').text();
                    if (image === undefined) {
                      image = null;
                    } else {
                      image = image.split('-310x165').join('');
                    }

                    var news = new News({
                      originalLink: url,
                      spiderId: spiderId,
                      categoryId: catelogyId,
                      image: image,
                      description: des,
                      active: false
                    });
                    News.findOne({
                      originalLink: news.originalLink
                    }, function (err, New) {
                      if (New === null) {
                        if (news.originalLink !== undefined) {
                          news.save();
                        }
                      }
                    });
                    i++;
                  });

                  gotoPage = $('#tie-next-page > a').attr('href');
                  if (gotoPage === undefined) {
                    return resolve(true);
                  }
                  callback(null, gotoPage);
                }
              });
            }
          },
          function (err, result) {
            path = result.gotoPage;
            next();
          });
      },
      function (err) {
        return resolve(true);
      })
  });
}

function spiderTinNongNghiep_path(urlId, spiderId, catelogyId) {
  console.log(urlId);
  urlId.path.forEach(url => {
    if (url.catelogyId.equals(catelogyId)) {
      var disUrl = urlId.hostname + url.namePath;
      getPath_spiderTinNongNghiep(disUrl, spiderId, url.catelogyId);
    }
  });
}

function spiderNongNghiepVietNam_path(urlId, spiderId, catelogyId) {
  console.log(urlId);
  urlId.path.forEach(url => {
    if (url.catelogyId.equals(catelogyId)) {
      var disUrl = urlId.hostname + url.namePath;
      getPath_spiderNongNghiepVietNam(disUrl, spiderId, url.catelogyId);
    }
  });
}

function spiderTinNongNghiep_Url(urlId, spiderId, url) {
  News.findOne({
    originalLink: url
  }, function (err, tNews) {
    if (tNews !== null) {
      return false;
    }
    var upNews = new News({
      originalLink: url,
      spiderId: spiderId,
    });
    upNews.save();
    return true;
  });
}

function spiderNongNghiepVietNam_Url(urlId, spiderId, url) {
  News.findOne({
    originalLink: url
  }, function (err, tNews) {
    if (tNews !== null) {
      return false;
    }
    var upNews = new News({
      originalLink: url,
      spiderId: spiderId,
    });
    upNews.save();
    return true;
  });
}

function spiderTinNongNghiep_updateAll() {
  News.find({
    $or: [{
      title: undefined
    }, {
      title: ""
    }, {
      content: undefined
    }, {
      author: undefined
    }, {
      author: ""
    }, {
      createDate: undefined
    }, {
      createDate: ""
    }]
  }, function (err, news) {
    var page = 0;
    var lastPage = news.length;
    async.whilst(function () {
        return page < lastPage;
      },
      function (next) {
        if (news[page].title === undefined || news[page].title === "") {
          request(news[page].originalLink, function (err, res, body) {
            if (!err && res.statusCode === 200) {
              var $ = cheerio.load(body);
              async.series({
                  title: function (callback) {
                    news[page].title = $('#main-content > div.content > article > div > h1 > span').text();
                    console.log(news[page].title);
                    callback(null, news[page].title);
                  },
                  content: function (callback) {
                    let content = $('#main-content > div.content > article > div').html();

                    //console.log('log content + ' + content);
                    //#main-content > div.content > article > div
                    let remove = $('#main-content > div.content > article > div > p').html();
                    //#main-content > div.content > article > div > p
                    let remove_review_overview = $('#main-content > div.content > article > div > div.entry > div.share-post').html();
                    //#main-content > div.content > article > div > div.entry > div.share-post
                    callback(null, content.split(remove).join('').split(remove_review_overview).join(''));
                  },
                  author: function (callback) {
                    let author = $('#main-content > div.content > article > div > p > span:nth-child(1) > a').text();
                    news[page].author = author;
                    callback(null, news[page].author);
                  },
                  createDate: function (callback) {
                    var date = new Date();
                    var dateF = $('#main-content > div.content > article > div > p > span:nth-child(2)').text().split('/');
                    date.setDate(dateF[0]);
                    date.setMonth(dateF[1]);
                    date.setFullYear(dateF[2]);
                    callback(null, date);
                  },
                  updateDate: function (callback) {
                    callback(null, Date.now());
                  }
                },
                function (err, result) {
                  news[page].title = result.title;
                  news[page].content = result.content;
                  news[page].author = result.author;
                  news[page].createDate = result.createDate;
                  news[page].updateDate = result.updateDate;
                  console.log(news[page].title);
                  console.log(news[page].createDate);
                  news[page].save(function (err) {
                    if (err) {
                      console.log('error');
                    }
                  });
                });
            } else {
              console.log('log die');
            }
            page++;
            next();
          });
        } else {
          page++;
          next();
        }
      },
      function (err) {});
  });
}

function spiderNongNghiepVietNam_updateAll() {
  News.find({
    $or: [{
      title: undefined
    }, {
      title: ""
    }, {
      content: undefined
    }, {
      author: undefined
    }, {
      author: ""
    }, {
      createDate: undefined
    }, {
      createDate: ""
    }]
  }, function (err, news) {
    var page = 0;
    var lastPage = news.length;
    console.log(lastPage);
    async.whilst(function () {
        return page < lastPage;
      },
      function (next) {
        if (news[page].title === undefined || news[page].title === "") {
          request(news[page].originalLink, function (err, res, body) {
            if (!err && res.statusCode === 200) {
              var $ = cheerio.load(body);
              async.series({
                  title: function (callback) {
                    news[page].title = $('#the-post > div > h1 > span').text();
                    callback(null, news[page].title);
                  },
                  content: function (callback) {
                    //#the-post > div
                    let content = $('#the-post > div > div.entry').html();
                    //#post-ratings-2150
                    //#the-post > div > div.entry > div
                    let remove = $('#main-content > div.content > article > div > div.entry > div.share-post').html();
                    let remove_review_overview = $('#the-post > div > div.entry > h2').html();
                    let remove_link = $('#the-post > div > div.entry > ul').html();
                    callback(null, content.split(remove).join('').split(remove_review_overview).join('').split(remove_link).join(''));
                  },
                  author: function (callback) {
                    let author = $('#the-post > div > p > span.post-meta-author > a').text();
                    news[page].author = author;
                    callback(null, news[page].author);
                  },
                  createDate: function (callback) {
                    var date = new Date();
                    var dateF = $('#the-post > div > p > span.tie-date').text().split('/');
                    date.setDate(dateF[0]);
                    date.setMonth(dateF[1]);
                    date.setFullYear(dateF[2]);
                    callback(null, date);
                  },
                  updateDate: function (callback) {
                    callback(null, Date.now());
                  }
                },
                function (err, result) {
                  news[page].title = result.title;
                  news[page].content = result.content;
                  news[page].author = result.author;
                  news[page].createDate = result.createDate;
                  news[page].updateDate = result.updateDate;
                  console.log(news[page].title);
                  console.log(news[page].createDate);
                  news[page].save(function (err) {
                    if (err) {
                      console.log('error');
                    }
                  });
                });
            } else {
              console.log('log die');
            }
            page++;
            next();
          });
        } else {
          page++;
          next();
        }
      },
      function (err) {});
  });
}

function spiderTinNongNghiep_updatePath(categoryId) {
  News.find({
    categoryId: categoryId
  }, function (err, news) {
    var page = 0;
    var lastPage = news.length;
    async.whilst(function () {
        return page < lastPage;
      },
      function (next) {
        if (news[page].title === undefined || news[page].title === "") {
          request(news[page].originalLink, function (err, res, body) {
            if (!err && res.statusCode === 200) {
              var $ = cheerio.load(body);
              async.series({
                  title: function (callback) {
                    news[page].title = $('#main-content > div.content > article > div > h1 > span').text();
                    callback(null, news[page].title);
                  },
                  content: function (callback) {
                    let content = $('#main-content > div.content > article > div > div.entry').html();
                    let remove = $('#main-content > div.content > article > div > div.entry > div.share-post').html();
                    callback(null, content.split(remove).join(''));
                  },
                  author: function (callback) {
                    news[page].author = $('#main-content > div.content > article > div > p > span:nth-child(1) > a').text();
                    callback(null, news[page].author);
                  },
                  createDate: function (callback) {
                    var date = new Date();
                    var dateF = $('#main-content > div.content > article > div > p > span:nth-child(2)').text().split('/');
                    date.setDate(dateF[0]);
                    date.setMonth(dateF[1]);
                    date.setFullYear(dateF[2]);
                    callback(null, date);
                  },
                  updateDate: function (callback) {
                    callback(null, Date.now());
                  }
                },
                function (err, result) {
                  news[page].title = result.title;
                  news[page].content = result.content;
                  news[page].author = result.author;
                  news[page].createDate = result.createDate;
                  news[page].updateDate = result.updateDate;
                  console.log(news[page].title);
                  console.log(news[page].createDate);
                  news[page].save(function (err) {
                    if (err) {
                      console.log('error');
                    }
                  });
                });
            } else {
              console.log('log die');
            }
            page++;
            next();
          });
        } else {
          page++;
          next();
        }
      },
      function (err) {});
  });
}

function spiderNongNghiepVietNam_updatePath(categoryId) {
  News.find({
    categoryId: categoryId
  }, function (err, news) {
    var page = 0;
    var lastPage = news.length;
    async.whilst(function () {
        return page < lastPage;
      },
      function (next) {
        if (news[page].title === undefined || news[page].title === "") {
          request(news[page].originalLink, function (err, res, body) {
            if (!err && res.statusCode === 200) {
              var $ = cheerio.load(body);
              async.series({
                  title: function (callback) {
                    news[page].title = $('#the-post > div > h1 > span').text();
                    callback(null, news[page].title);
                  },
                  content: function (callback) {
                    let content = $('#the-post > div > div.entry').html();
                    let remove = $('#main-content > div.content > article > div > div.entry > div.share-post').html();
                    let remove_review_overview = $('#the-post > div > div.entry > h2').html();
                    let remove_link = $('#the-post > div > div.entry > ul').html();
                    callback(null, content.split(remove).join('').split(remove_review_overview).join('').split(remove_link).join(''));
                  },
                  author: function (callback) {
                    let author = $('#the-post > div > p > span.post-meta-author > a').text();
                    news[page].author = author;
                    callback(null, news[page].author);
                  },
                  createDate: function (callback) {
                    var date = new Date();
                    var dateF = $('#the-post > div > p > span.tie-date').text().split('/');
                    date.setDate(dateF[0]);
                    date.setMonth(dateF[1]);
                    date.setFullYear(dateF[2]);
                    callback(null, date);
                  },
                  updateDate: function (callback) {
                    callback(null, Date.now());
                  }
                },
                function (err, result) {
                  news[page].title = result.title;
                  news[page].content = result.content;
                  news[page].author = result.author;
                  news[page].createDate = result.createDate;
                  news[page].updateDate = result.updateDate;
                  console.log(news[page].title);
                  console.log(news[page].createDate);
                  news[page].save(function (err) {
                    if (err) {
                      console.log('error');
                    }
                  });
                });
            } else {
              console.log('log die');
            }
            page++;
            next();
          });
        } else {
          page++;
          next();
        }
      },
      function (err) {});
  });
}

function spiderTinNongNghiep_updateUrl(url) {
  News.findById({
    _id: url
  }, function (err, upNews) {
    if (upNews !== null) {
      console.log('this is upNews ' + upNews);
      request(upNews.originalLink, function (err, res, body) {
        if (!err && res.statusCode === 200) {
          var $ = cheerio.load(body);
          async.series({
              title: function (callback) {
                upNews.title = $('#main-content > div.content > article > div > h1 > span').text();
                callback(null, upNews.title);
              },
              content: function (callback) {
                let content = $('#main-content > div.content > article > div > div.entry').html();
                let remove = $('#main-content > div.content > article > div > div.entry > div.share-post').html();
                callback(null, content.split(remove).join(''));
              },
              author: function (callback) {
                upNews.author = $('#main-content > div.content > article > div > p > span:nth-child(1) > a').text();
                callback(null, upNews.author);
              },
              createDate: function (callback) {
                var date = new Date();
                var dateF = $('#main-content > div.content > article > div > p > span:nth-child(2)').text().split('/');
                date.setDate(dateF[0]);
                date.setMonth(dateF[1]);
                date.setFullYear(dateF[2]);
                callback(null, date);
              },
              updateDate: function (callback) {
                callback(null, Date.now());
              }
            },
            function (err, result) {
              upNews.title = result.title;
              upNews.content = result.content;
              upNews.author = result.author;
              upNews.createDate = result.createDate;
              upNews.updateDate = result.updateDate;
              console.log(upNews.title);
              console.log(upNews.createDate);
              upNews.save(function (err) {
                if (err) {
                  console.log('error');
                }
              });
            });
        } else {
          console.log('log die');
        }
      });
    }
  });
}

function spiderNongNghiepVietNam_updateUrl(url) {
  News.findById({
    _id: url
  }, function (err, news) {
    if (news !== null) {
      console.log('this is upNews ' + news);
      request(news.originalLink, function (err, res, body) {
        if (!err && res.statusCode === 200) {
          var $ = cheerio.load(body);
          async.series({
              title: function (callback) {
                news.title = $('#the-post > div > h1 > span').text();
                callback(null, news.title);
              },
              content: function (callback) {
                let content = $('#the-post > div > div.entry').html();
                let remove = $('#the-post > div > div.entry > div').html();
                //#post-ratings-1750
                //#the-post > div > div.entry > div
                // let remove_review_overview = $('#main-content > div.content > article > div > div.entry > div.review-box.review-top.review-stars').html();
                callback(null, content.split(remove).join(''));
              },
              author: function (callback) {
                let author = $('#the-post > div > p > span.post-meta-author > a').text();
                news.author = author;
                callback(null, news.author);
              },
              createDate: function (callback) {
                var date = new Date();
                var dateF = $('#the-post > div > p > span.tie-date').text().split('/');
                date.setDate(dateF[0]);
                date.setMonth(dateF[1]);
                date.setFullYear(dateF[2]);
                callback(null, date);
              },
              updateDate: function (callback) {
                callback(null, Date.now());
              }
            },
            function (err, result) {
              news.title = result.title;
              news.content = result.content;
              news.author = result.author;
              news.createDate = result.createDate;
              news.updateDate = result.updateDate;

              news.save(function (err) {
                if (err) {
                  console.log('error');
                }
              });
            });
        } else {
          console.log('log die');
        }
      });
    }
  });
}
