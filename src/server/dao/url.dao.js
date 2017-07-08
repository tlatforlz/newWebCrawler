var Url = require('./../model/url.model');
var successMessage = require('./../services/successMessage');
var failMessage = require('./../services/failMessage');
module.exports = {
    createUrl: createUrl,
    getAllUrl: getAllUrl,
    getUrlById: getUrlById,
    updateUrl: updateUrl,
    deleteUrl: deleteUrl
};

function createUrl(request){
    var newUrl = new Url({
        title: request.title,
        hostname: request.hostname
    });
    return Url.findOne({hostname : request.hostname}).exec()
        .then(function(url){
            if(url != null){
                return Promise.reject({
                    message: failMessage.url.dupplicate       
                });
            }
            return newUrl.save().then(function(err){
                return Promise.resolve({
                    message: successMessage.url.create
                })
            });
        });
}

function getAllUrl(request){

}

function getUrlById(request){

}

function updateUrl(request){

}

function deleteUrl(request){

}