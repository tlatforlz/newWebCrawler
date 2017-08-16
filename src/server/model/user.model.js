var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
  },
  username: {
    type: String
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  image: {
    type: String
  },
  birthday: {
    type: String
  },
  gender: {
    type: String
  },
  position: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  role: {
    type: String
  }
});
var user = mongoose.model('user', userSchema);

module.exports = user;
