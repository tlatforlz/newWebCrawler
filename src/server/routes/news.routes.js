var router = require('express').Router();
var newsDao = require('./../dao/news.dao');

module.exports = function () {
  router.post('/', createNews);
  router.put('/activeAll', activeAll);
  router.get('/', getAllNews);
  router.get('/countNews', countNews);
  router.get('/countNewsActive', countNewsActive);
  router.get('/totalView', totalView);
  router.get('/:id', getNewsById);
  router.put('/:id', updateNews);
  router.delete('/:id', deleteNews);
  router.put('/action/active', activeNews);
  router.put('/action/deActive', deActiveNews);
  router.get('/getHome/getNewsHome', getNewsHome);
  router.get('/getNews/getNewsNearest', getNewsNearest);
  router.get('/getNews/getNewsMostPopular', getNewsMostPopular);
  router.get('/getNews/getNewsArchive/:path', getNewsArchive);
  router.get('/getNews/getNewsArchive/pagination/:path/:pageIndex/:pageSize', getNewsArchivePagination);
  router.get('/getNews/getNewsSearch/pagination/:searchKey/:pageIndex/:pageSize', getNewsSearch);


  function createNews(req, res, next) {
    var request = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      image: req.body.image,
      author: req.body.author,
      originalLink: req.body.originaLink,
      spiderId: req.body.spiderId,
      categoryId: req.body.categoryId
    }
    newsDao.createNews(request)
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  function activeAll(req, res, next) {
    newsDao.activeAll()
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  function getAllNews(req, res, next) {
    newsDao.getAllNews()
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  function getNewsById(req, res, next) {
    var request = {
      id: req.params.id
    }
    newsDao.viewCount(request)
      .then(function (news) {
        res.status(200).send(news).end()
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      })
  }

  function updateNews(req, res, next) {
    var request = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      image: req.body.image,
      author: req.body.author,
      originalLink: req.body.originaLink,
      spiderId: req.body.spiderId,
      categoryId: req.body.categoryId,
      active: req.body.active
    }
    newsDao.updateNews(request)
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      })
  }

  function deleteNews(req, res, next) {
    var request = {
      id: req.params.id
    }
    newsDao.deleteNews(request)
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }


  function activeNews(req, res, next) {
    var request = {
      newsId: req.body.newsId
    }
    newsDao.activeNews(request)
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  function deActiveNews(req, res, next) {
    var request = {
      newsId: req.body.newsId
    }

    newsDao.deActiveNews(request)
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  function getNewsHome(req, res, next) {
    newsDao.getNewsHome()
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }


  //getNewsNearest
  function getNewsNearest(req, res, next) {
    newsDao.getNewsNearest()
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  //getNewsMostPopular
  function getNewsMostPopular(req, res, next) {
    newsDao.getNewsMostPopular()
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  function getNewsArchive(req, res, next) {
    var request = {
      path: req.params.path
    }
    newsDao.getNewsArchive(request)
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      })
  }

  //getNewsArchivePagegination
  function getNewsArchivePagination(req, res, next) {
    var request = {
      path: req.params.path,
      pageIndex: parseInt(req.params.pageIndex),
      pageSize: parseInt(req.params.pageSize)
    }
    newsDao.getNewsArchivePagination(request)
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      })
  }

  //getNewsSearch
  function getNewsSearch(req, res, next) {
    var request = {
      searchKey: req.params.searchKey,
      pageIndex: parseInt(req.params.pageIndex),
      pageSize: parseInt(req.params.pageSize)
    }
    newsDao.getNewsSearch(request)
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      })
  }

  //countNews
  function countNews(req, res, next) {

    newsDao.countNews()
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      })
  }

  //countNewsActive
  function countNewsActive(req, res, next) {

    newsDao.countNewsActive()
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      })
  }

  //totalView
  function totalView(req, res, next) {

    newsDao.totalView()
      .then(function (news) {
        res.status(200).send(news).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      })
  }
  return router;
}
