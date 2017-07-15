var router = require('express').Router();
var GiayDao = require('./../dao/giay.dao');

//Giay
module.exports = function () {
  router.post('/', createGiay);
  router.get('/', getAllGiay);

  function createGiay(req, res, next) {
    var request = {
      MaGiay: req.body.MaGiay,
      TenGiay: req.body.TenGiay,
      GiaBan: req.body.GiaBan,
      MoTa: req.body.MoTa,
      Anh: req.body.Anh,
      NgayCapNhap: Date.now(),
      SoLuong: req.body.SoLuong,
      MaLoai: req.body.MaLoai,
      MaNSX: req.body.MaNSX
    };

    GiayDao.createGiay(request)
      .then(function (Giay) {
        res.status(200).send(Giay).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      })
  }

  function getAllGiay(req, res, next) {
    GiayDao.getAllGiay()
      .then(function (Giays) {
        res.status(200).send(Giays).end();
      })
      .catch(function (err) {
        res.status(400).send(err).end();
      });
  }

  return router;
}
