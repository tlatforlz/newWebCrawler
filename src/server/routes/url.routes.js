var router = require('express').Router();
var urlDao = require('./../dao/url.dao');

module.exports = function () {
    router.post('/', createUrl);
    router.get('/', getAllUrl);
    router.get('/:id', getUrlById);
    router.put('/:id', updateUrl);
    router.delete('/:id', deleteUrl);

    function createUrl(req, res, next) {
        var request = {
            title: req.body.title,
            hostname: req.body.hostname
        };
        urlDao.createUrl(request)
            .then(function(url){
                res.status(200).send(url).end();
            })
            .catch(function(err){
                res.status(400).send(err).end();
            });
    }

    function getAllUrl(req, res, next) {

    }

    function getUrlById(req, res, next) {

    }

    function updateUrl(req, res, next){

    }

    function deleteUrl(req, res, next){

    }

    return router;
};