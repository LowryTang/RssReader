var mongoose = require('mongoose'),
    db = require('./dbhelper');

var NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: Date,
});

var NewsModel = mongoose.model('News', NewsSchema);

var News = function New() {
  this.title = null;
  this.content = null;
  this.date = null; 
}




