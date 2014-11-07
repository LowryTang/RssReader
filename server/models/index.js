var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/rss', function (err) {
  if (err) {
    console.log('Connect DB Error : ', err);
  }
});

module.exports = db;