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
    type: Date
  },
  createDate: {
    type: Date
  },
  views: {
    type: Number,
    default: 10
  },
  active: {
    type: Boolean,
    default: false
  }
});

newsSchema.index({
  name: 'text',
  content: 'text'
});

var spider = mongoose.model('news', newsSchema);
module.exports = spider;
