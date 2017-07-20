var request = require("request");
var cheerio = require("cheerio");
var Spider = require('../dao/spider.dao');
var newsDao = require('../dao/news.dao');
var News = require('./../model/news.model');
var async = require('async');

module.exports = {
  spiderTinNongNghiep: spiderTinNongNghiep,
  spiderTinNongNghiep_updateAll: spiderTinNongNghiep_updateAll,
  spiderTinNongNghiep_path: spiderTinNongNghiep_path,
  spiderTinNongNghiep_updatePath: spiderTinNongNghiep_updatePath,
  spiderTinNongNghiep_Url: spiderTinNongNghiep_Url,
  spiderTinNongNghiep_updateUrl: spiderTinNongNghiep_updateUrl
}

function spiderTinNongNghiep(urlId, spiderId) {
  console.log(urlId);
  console.log(urlId.path);

  urlId.path.forEach(url => {
    var disUrl = urlId.hostname + url.namePath;
    getPath_spiderTinNongNghiep(disUrl, spiderId, url.catelogyId);
  });
}

function getPath_spiderTinNongNghiep(path, spiderId, catelogyId) {
  if (path === undefined) {
    return;
  }
  request(path, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var $ = cheerio.load(body);
      var i = 1;
      $('.post-listing .post-box-title a').each(function () {
        //#main-content > div.content > div.post-listing > article:nth-child(1)
        url = ($(this).attr('href'));
        image = $('#main-content > div.content > div.post-listing > article:nth-child(' + i + ') > div.post-thumbnail > a > img').attr('src');
        console.log(image);
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
          active: true
        });
        News.findOne({
          originalLink: news.originalLink
        }, function (err, New) {
          if (New === null) {
            news.save();
          }
        });
        i++;
      });
    }
    gotoPage = $('#tie-next-page a').attr('href');
    if (gotoPage === undefined) {
      return;
    }
    getPath_spiderTinNongNghiep(gotoPage, spiderId, catelogyId);
  });
  return;
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

function spiderTinNongNghiep_updateAll() {
  News.find({}, function (err, news) {
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
                    let remove_review_overview = $('#main-content > div.content > article > div > div.entry > div.review-box.review-top.review-stars').html();
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
