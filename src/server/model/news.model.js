var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  content: {
    type: String
  },
  image: {
    type: String
  },
  author: {
    type: String
  },
  originalLink: {
    type: String
  },
  spiderId: {
    type: Schema.Types.ObjectId,
    ref: 'spider'
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  updateDate: {
    type: Date,
    default: Date.now()
  },
  createDate: {
    type: Date,
    default: Date.now()
  }
});

var spider = mongoose.model('news', newsSchema);
module.exports = spider;
