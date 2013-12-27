var webservice = require('./webservice.js'),
    mongodb = require('./db.js'),
    mongoose = require('mongoose'),
    Shcema = mongoose.Schema;

function News(params){
  this.host = params.host;
  this.name = params.name;
  this.news = [];
  this.request = new webservice();
}

module.exports = News;

News.prototype.getNews = function(callback) {
  var self = this;
  this.request.get(this.host, function(err, data) {
    if(err){
      return callback(err);
    }
    self.save2DB(data.rss.channel[0]);
  });
}

News.prototype.save2DB = function(results) {
  console.log(results.title);
  // console.log(results.item);
  for (var i = 0; i < results.item.length; i++) {
    //results[i]
  }
  console.log(results.item[0]);
}

News.findFromDB = function(params) {

}

  