var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var newsSchema = new Schema({
  title: String,
  description: String,
  link: String,
  pub_date: Date,
  site_id: ObjectId
});

var News = mongoose.model('News', newsSchema);

var NewsDAO = function () {};

NewsDAO.prototype.newAndSave = function(obj, callback) {
  var news = new News();
  news.title = obj.title;
  news.description = obj.description;
  news.link = obj.link;
  news.pub_date = obj.pubDate;
  news.site_id = obj.siteId;
  news.save(callback);
};

NewsDAO.prototype.findNewsBySiteId = function(siteId, page, size, callback) {
  News.find({site_id: siteId}, null, {sort: {'pub_date': 'desc'}}, function (err, news) {
    callback(err, news);
  })
};

module.exports = new NewsDAO();