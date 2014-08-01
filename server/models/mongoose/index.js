var mongoose = require('mongoose'),
  settings = require('../../settings');

var db = mongoose.connect('mongodb://localhost/rss', function (err) {
  console.log('Connect DB Error : ', err);
});

module.exports = db;
