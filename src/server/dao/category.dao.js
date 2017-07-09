var Category = require('./../model/category.model');
var successMessage = require('./../services/successMessage');
var failMessage = require('./../services/failMessage');

module.exports = {
  createCategory: createCategory,
  getAllCategory: getAllCategory,
  getCategoryById: getCategoryById,
  updateCategory: updateCategory,
  deleteCategory: deleteCategory
};

function createCategory(request) {
  var newCategory = new Category({
    name: request.name,
    keys: request.keys
  });
  return Category.findOne({
      name: request.name
    }).exec()
    .then(function (Category) {
      if (Category != null) {
        return Promise.reject({
          message: failMessage.category.dupplicate
        });
      }
      return newCategory.save().then(function (err) {
        return Promise.resolve({
          message: successMessage.category.create
        });
      });
    });
}

function getAllCategory(request) {
  return Category.find().exec()
    .then(function (Categorys) {
      if (Categorys.length === 0) {
        return Promise.reject({
          message: failMessage.category.notFound
        });
      }
      return Promise.resolve({
        message: successMessage.category.getAll,
        categorys: Categorys
      });
    });
}

function getCategoryById(request) {
  return Category.findOne({
    _id: request.id
  }).exec().then(function (category) {
    if (category === null) {
      return Promise.reject({
        message: failMessage.category.notFound
      });
    }
    return Promise.resolve({
      message: successMessage.category.get,
      category: category
    });
  });
}

function updateCategory(request) {
  return Category.findById({
    _id: request.id
  }).exec().then(function (category) {
    if (category === null) {
      return Promise.reject({
        message: failMessage.category.notFound
      });
    }
    if (request.name !== undefined && request.name !== '') {
      category.name = request.name;
    }
    if (request.keys !== undefined && request.keys.length !== 0) {
      category.keys = request.keys;
    }
    return Category.findOne({
        name: request.name,
        _id: {
          $ne: request.id
        }
      }).exec()
      .then(function (Category) {
        if (Category != null) {
          return Promise.reject({
            message: failMessage.category.dupplicate
          });
        }
        return category.save().then(function (err) {
          return Promise.resolve({
            message: successMessage.category.create,
            category: category
          });
        });
      });
  });
}

function deleteCategory(request) {
  return Category.findByIdAndRemove({
    _id: request.id
  }).exec().then(function (err) {
    if (!err) {
      return Promise.reject({
        message: failMessage.category.notFound
      });
    }
    return Promise.resolve({
      message: successMessage.category.delete
    });
  });
}
