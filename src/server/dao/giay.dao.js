var Giay = require('./../model/giay.model');
var successMessage = require('./../services/successMessage');
var failMessage = require('./../services/failMessage');

module.exports = {
  createGiay: createGiay,
  getAllGiay: getAllGiay
};

function createGiay(request) {
  var newGiay = new Giay({
    MaGiay: request.MaGiay,
    TenGiay: request.TenGiay,
    GiaBan: request.GiaBan,
    MoTa: request.MoTa,
    Anh: request.Anh,
    NgayCapNhap: Date.now(),
    SoLuong: request.SoLuong,
    MaLoai: request.MaLoai,
    MaNSX: request.MaNSX
  });
  return Giay.findOne({
      MaGiay: request.MaGiay
    }).exec()
    .then(function (Giay) {
      if (Giay != null) {
        return Promise.reject({
          message: failMessage.catelogy.dupplicate
        });
      }
      return newGiay.save().then(function (err) {
        return Promise.resolve({
          message: successMessage.Giay.create
        });
      });
    });
}

function getAllGiay() {
  return Giay.find().exec()
    .then(function (Giays) {
      if (Giays.length === 0) {
        return Promise.reject({
          message: failMessage.catelogy.notFound
        });
      }
      return Promise.resolve({
        Giay: Giays
      });
    });
}
