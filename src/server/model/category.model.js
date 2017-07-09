var mongoose = require('mongoose');
var Schemar = mongoose.Schema;

var categorySchema = new Schemar({
  name: {
    type: String,
    require: true
  },
  keys: [String]
});
var category = mongoose.model('category', categorySchema);
module.exports = category;
