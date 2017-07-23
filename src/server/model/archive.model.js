var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var archiveSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  path: {
    type: String
  },
  listCategory: [{
    type: Schema.Types.ObjectId,
    ref: 'category'
  }]
});

var archive = mongoose.model('archive', archiveSchema);
module.exports = archive;
