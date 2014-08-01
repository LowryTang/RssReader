var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rss', function (err, data) {
  if (err) {
    console.log('Connect DB Error : ', err);
  }
});



var siteSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  link: String,
  last_build_date: Date,
  create_data: {type: Date, default: Date.now},
  last_modified: {type: Date, default: Date.now},
  favor_number: {type: Number, default: 0}
});

var Site = mongoose.model('Site', siteSchema);

var SiteDAO = function () {};

SiteDAO.prototype.newAndSave = function (obj, callback) {
  var site = new Site();
  site.title = obj.title;
  site.description = obj.description;
  site.url = obj.url;
  site.link = obj.link;
  site.save(callback);
};

SiteDAO.prototype.getById = function (id, callback) {
  Site.findOne({
    _id: id
  }, {
    __v: 0
  }, callback);
};

SiteDAO.prototype.getAll = function (callback) {
  Site.find(null, {
    items: 0,
    __v: 0
  }, callback);
};

SiteDAO.prototype.getByUrl = function (url, callback) {
  Site.find({url: url}, callback);
}

module.exports = new SiteDAO();
