var webservice = require('./webservice.js'),
  mongodb = require('./db.js');

function Site(params) {
  this.name = params.name;
  this.host = params.host;
  this.news = [];
}

module.exports = Site;

Site.prototype.save = function (callback) {
  mongodb.openCollection('sites', function (err, collection) {
    var site = {
      name: this.name,
      host: this.host;
      createTime: new Date().getTime();
    }
    collection.insert(site, {
      safe: true
    }, function (err, site) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      callback(null, site[0]);
    });
  })
}

Site.prototype.getNews = function (callback) {
  var self = this;
  webservice.get(this.host, function (err, data) {
    if (err) {
      return callback(err);
    }
    save2DB(data.rss.channel[0]);
  });
}

function save2DB (results) {
  console.log(results.title);
  // console.log(results.item);
  for (var i = 0; i < results.item.length; i++) {
    mongodb.openCollection('sites', function (err, collection) {
      collection.findOne({}, {w:1}, function (err, site) {
        
      });
    })
  }
  console.log(results.item[0]);
}

Site.findFromDB = function (params) {

}
