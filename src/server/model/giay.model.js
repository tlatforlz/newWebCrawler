var mongoose = require('mongoose');
var Schemar = mongoose.Schema;

var giaySchema = new Schemar({
  MaGiay: {
    type: String
  },
  TenGiay: {
    type: String
  },
  GiaBan: {
    type: String
  },
  MoTa: {
    type: String
  },
  Anh: {
    type: String
  },
  NgayCapNhap: {
    type: Date
  },
  SoLuong: {
    type: Number
  },
  MaLoai: {
    type: String
  },
  MaNSX: {
    type: String
  },
});
var giay = mongoose.model('giay', giaySchema);
module.exports = giay;
