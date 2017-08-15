var mongoose = require('mongoose')

module.exports = mongoose.model('Madlib', {
  story : String,
});