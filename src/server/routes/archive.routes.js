var router = require('express').Router();
var ArchiveDao = require('./../dao/archive.dao');

//Archive
module.exports = function () {
  router.post('/', createArchive);
  router.get('/', getAllArchive);
  router.get('/:id', getArchiveById);
  router.put('/:id', updateArchive);
  router.delete('/:id', deleteArchive);

  function createArchive(req, res, next) {
    var request = {
      name: req.body.name,
      path: req.body.path,
      listCategory: req.body.listCategory
    };
    ArchiveDao.createArchive(request)
      .then(function (Archive) {
        res.status(200).send(Archive).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      })
  }

  function getAllArchive(req, res, next) {
    ArchiveDao.getAllArchive()
      .then(function (Archives) {
        res.status(200).send(Archives).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  function getArchiveById(req, res, next) {
    var request = {
      id: req.params.id
    }
    ArchiveDao.getArchiveById(request)
      .then(function (Archive) {
        res.status(200).send(Archive).end();
      }).catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  function updateArchive(req, res, next) {
    var request = {
      id: req.params.id,
      name: req.body.name,
      path: req.body.path,
      listCategory: req.body.listCategory
    }
    ArchiveDao.updateArchive(request)
      .then(function (Archive) {
        res.status(200).send(Archive).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  function deleteArchive(req, res, next) {
    var request = {
      id: req.params.id
    }
    ArchiveDao.deleteArchive(request)
      .then(function (Archive) {
        res.status(200).send(Archive).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  return router;
}