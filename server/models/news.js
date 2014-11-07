var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var newsSchema = new Schema({
  title: String,
  description: String,
  link: String,
  pubDate: Date,
  siteId: ObjectId
});

var News = mongoose.model('News', newsSchema);

var NewsDAO = function () {};

NewsDAO.prototype.newAndSave = function(obj, callback) {
  var news = new News();
  news.title = obj.title;
  news.description = obj.description;
  news.link = obj.link;
  news.pubDate = obj.pubDate;
  news.siteId = obj.siteId;
  news.save(callback);
};

NewsDAO.prototype.getNewsBySiteId = function(siteId, page, size, callback) {
  News.find({siteId: siteId}, {__v: 0}).sort('-pubDate').limit(size).skip(page * size).exec(callback);
};

module.exports = new NewsDAO();