var request = require("request");
var cheerio = require("cheerio");
var Spider = require('../dao/spider.dao');
var newsDao = require('../dao/news.dao');
var News = require('./../model/news.model');

module.exports = {
  spiderTinNongNghiep: spiderTinNongNghiep,
  updateContentSpiderTinNongNghiep: updateContentSpiderTinNongNghiep
}
var fullPath = [];

function spiderTinNongNghiep(urlId, spiderId) {
  console.log(urlId);
  console.log(urlId.path);

  urlId.path.forEach(url => {
    var disUrl = urlId.hostname + url.namePath;
    getPath_spiderTinNongNghiep(disUrl, spiderId, url.catelogyId, fullPath);
  });

}

function updateContentSpiderTinNongNghiep() {
  News.find({}, function (err, news) {
    console.log(news.length);
    news.forEach(epnews => {
      console.log(epnews._id);
      News.findById({
        _id: epnews._id
      }, function (err, upNews) {
        console.log(upNews.originalLink);
        request(upNews.originalLink, function (error, response, body) {
          console.log('fuck bug');

          if (!error) {
            var $ = cheerio.load(body);
          }
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

      });
    })
  });
}

function getPath_spiderTinNongNghiep(path, spiderId, catelogyId, fullPath) {
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
        catelogyId: catelogyId
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
    getPath_spiderTinNongNghiep(gotoPage, spiderId, catelogyId, fullPath);
  });
  return;
}
