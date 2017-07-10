var router = require('express').Router();
var newsDao = require('./../dao/news.dao');

module.exports = function () {
  router.post('/', createNews);
  router.get('/', getAllNews);
  router.get('/:id', getNewsById);
  router.put('/:id', updateNews);
  router.delete('/:id', deleteNews);

  function createNews(req, res, next) {
    var request = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      image: req.body.image,
      author: req.body.author,
      originalLink: req.body.originaLink,
      spiderId: req.body.spiderId,
      categoryId: req.body.categoryId,
    }
    newsDao.createNews(request)
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
    newsDao.getNewsById(request)
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


  return router;
}
