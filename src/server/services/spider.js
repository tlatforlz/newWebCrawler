var request = require("request");
var cheerio = require("cheerio");
var Spider = require('../dao/spider.dao');
module.exports = {
  spiderTinNongNghiep: spiderTinNongNghiep
}

function spiderTinNongNghiep(urlId) {
    console.log(urlId);
    console.log(urlId.path);
    urlId.path.forEach(function (url) {
        var disUrl = urlId.hostname + url;
        var listPage = [];
        getPath_spiderTinNongNghiep(listPage, disUrl);
        console.log(URL + " ============= ")
        console.log(listPage);
    });
}

function getPath_spiderTinNongNghiep(listPage, path) {

    var req = request(path, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body);
        }
     
        $('.post-listing .post-box-title a').each(function () {
            url = ($(this).attr('href'));
            listPage.push(url);
            console.log(url);
        });

        gotoPage = $('#tie-next-page a').attr('href');
        console.log(gotoPage + " GO TO PAGE");
        if (gotoPage === undefined) {
            return;
        }
        getPath_spiderTinNongNghiep(listPage, gotoPage);
    });
    req.abort();
}


function getContent_spiderTinNongNghiep(url ) {

}
