var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  hostname: {
    type: String,
    require: true
  },
  path: [{
    namePath: {
      type: String
    },
    catelogyId: {
      type: Schema.Types.ObjectId,
      ref: 'catelogy'
    }
  }]
});

var url = mongoose.model('url', urlSchema);
module.exports = url;
