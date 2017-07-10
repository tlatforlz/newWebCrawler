var request = require("request");
var cheerio = require("cheerio");
var Spider = require('../dao/spider.dao');
var newsDao = require('../dao/news.dao');

module.exports = {
  spiderTinNongNghiep: spiderTinNongNghiep
}

function spiderTinNongNghiep(urlId, spiderId) {
  console.log(urlId);
  console.log(urlId.path);
  //getContent_spiderTinNongNghiep('https://tinnongnghiep.vn/panama-se-cu-doan-toi-viet-nam-thanh-tra-ca-tra/', spiderId);
  urlId.path.forEach(function (url) {
    var disUrl = urlId.hostname + url.namePath;
    getPath_spiderTinNongNghiep(disUrl, spiderId, url.catelogyId);
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
      console.log(url);
      getContent_spiderTinNongNghiep(url, spiderId, catelogyId);
    });
    gotoPage = $('#tie-next-page a').attr('href');
    if (gotoPage === undefined) {
      return;
    }
    getPath_spiderTinNongNghiep(gotoPage, spiderId, catelogyId);
  });
  return;
}


function getContent_spiderTinNongNghiep(url, spiderId, catelogyId) {
  var req = request(url, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body);
    }
    var news = {
      title: $('#main-content > div.content > article > div > h1 > span').text(),
      content: $('#main-content > div.content > article > div > div.entry').html(),
      author: $('#main-content > div.content > article > div > p > span:nth-child(1) > a').text(),
      originalLink: url,
      createDate: $('#main-content > div.content > article > div > p > span:nth-child(2)').text(),
      spiderId: spiderId,
      catelogyId: catelogyId
    };
    console.log(news.title);
    newsDao.addNews(news);
    //   console.log(news);

    return;
  });
}
