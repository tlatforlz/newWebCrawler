var request = require("request");
var cheerio = require("cheerio");
var Spider = require('../dao/spider.dao');
var newsDao = require('../dao/news.dao');
var News = require('./../model/news.model');
var async = require('async');

module.exports = {
  spiderTinNongNghiep: spiderTinNongNghiep,
  updateContentSpiderTinNongNghiep: updateContentSpiderTinNongNghiep,
  insertPromise: insertPromise,
  final: final
}


function spiderTinNongNghiep(urlId, spiderId) {
  console.log('blabla');
  console.log(urlId);
  console.log(urlId.path);

  urlId.path.forEach(url => {
    var disUrl = urlId.hostname + url.namePath;
    getPath_spiderTinNongNghiep(disUrl, spiderId, url.catelogyId);
  });

}

function requestPromise(options) {
  return new Promise(function (resolve, reject) {
    console.log(options.url);
    request(options.url, function (err, resp, body) {
      if (err) return reject(err);
      resolve(body);
    });
  });
}

function final() {
  var allNews = [];
  async.waterfall(
    [
      function (callback) {
        News.find({}, function (err, news) {
          callback(null, news);
        });
      },
      function (news) {
        news.forEach(function (upNews) {
          request(upNews.originalLink, function (err, res, body) {
            if (!err) {
              var $ = cheerio.load(body);
              async.waterfall(
                [
                  function (callback) {
                    var date = new Date();
                    var dateF = $('#main-content > div.content > article > div > p > span:nth-child(2)').text().split('/');
                    date.setDate(dateF[0]);
                    date.setMonth(dateF[1]);
                    date.setFullYear(dateF[2]);
                    upNews.createDate = date;
                    upNews.updateDate = Date.now();
                    upNews.title = $('#main-content > div.content > article > div > h1 > span').text();
                    callback(null, upNews);
                  },
                  function (upNews, callback) {
                    upNews.content = $('#main-content > div.content > article > div > div.entry').html();
                    callback(null, upNews);
                  },
                  function (upNews, callback) {
                    upNews.author = $('#main-content > div.content > article > div > p > span:nth-child(1) > a').text();
                    callback(null, upNews);
                  }
                ],
                function (err, upNews) {
                  //   console.log(upNews);
                  console.log(upNews.originalLink);
                  upNews.save(function (err) {
                    console.log(err);
                  });
                });
            }
          });
        });
      }
    ],
    function () {

    });
}

function insertPromise(promises) {
  News.find({}, function (err, news) {
    news.forEach(function (url) {
      promises.push(requestPromise({
        url: url.originalLink,
        id: url._id
      }));
    });
  });
}

function updateContentSpiderTinNongNghiep(promises) {
  console.log(promises.length);
  Promise.all(promises).then(function (data) {
    console.log(data.length);
    for (var i = 0; i < data.length; i++) {
      console.log(data[i].id);
      if ($ = cheerio.load(data[i])) {
        News.findById({
          _id: data[i].id
        }, function (err, upNews) {
          let newsTemp = {
            title: $('#main-content > div.content > article > div > h1 > span').text(),
            content: $('#main-content > div.content > article > div > div.entry').html(),
            author: $('#main-content > div.content > article > div > p > span:nth-child(1) > a').text(),
            createDate: $('#main-content > div.content > article > div > p > span:nth-child(2)').text(),
          };

          upNews.title = newsTemp.title;
          upNews.content = newsTemp.content;
          upNews.author = newsTemp.author;
          upNews.createDate = newsTemp.createDate;
          upNews.updateDate = Date.now();
          upNews.save();
        });
      }
    }
  });
} //end func

function updateContentSpiderTinNongNghiep3() {
  News.find({}, function (err, news) {
    console.log(news.length);
    news.forEach(epnews => {
      console.log(epnews._id);
      News.findById({
        _id: epnews._id
      }, function (err, upNews) {
        console.log(upNews.originalLink);
        request(upNews.originalLink, function (error, response, body) {

          if (!error) {
            var $ = cheerio.load(body);
          }
          var newsTemp = {
            title: $('#main-content > div.content > article > div > h1 > span').text(),
            content: $('#main-content > div.content > article > div > div.entry').html(),
            author: $('#main-content > div.content > article > div > p > span:nth-child(1) > a').text(),
            createDate: $('#main-content > div.content > article > div > p > span:nth-child(2)').text(),
          };

          upNews.title = newsTemp.title;
          upNews.content = newsTemp.content;
          upNews.author = newsTemp.author;
          upNews.createDate = newsTemp.createDate;
          upNews.updateDate = Date.now();

        });
        upNews.save(function (err) {

        });
      });
    })
  });
}

function getPath_spiderTinNongNghiep(path, spiderId, catelogyId) {
  if (path === undefined) {
    return;
  }
  request(path, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body);
    }
    $('.post-listing .post-box-title a').each(function () {
      url = ($(this).attr('href'));
      var news = new News({
        originalLink: url,
        spiderId: spiderId,
        categoryId: catelogyId
      });
      News.findOne({
        originalLink: news.originalLink
      }, function (err, New) {
        if (New === null) {
          news.save();
        }
      });
    });
    gotoPage = $('#tie-next-page a').attr('href');
    if (gotoPage === undefined) {
      return;
    }
    getPath_spiderTinNongNghiep(gotoPage, spiderId, catelogyId);
  });
  return;
}
