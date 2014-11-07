var News = require('../models/news.js');
var Site = require('../models/site.js');
var siteclient = require('../services/siteclient.js');
var async = require('async');
var cache = require('../services/cache');
var crypto = require('crypto');
var _ = require('underscore');

module.exports.requestSiteNews = function (req, res, next) {
  var siteId = req.params.id;
  Site.getById(siteId, function (err, site) {
    if (err) return next(err);
    siteclient.getSiteNews(site, function (err, results, lastBuildDate) {
      if (err) return next(err);
      var news = [];
      for (var i = 0; i < results.length; i++) {
        if (results[i].pubDate > site.lastBuildDate || !site.lastBuildDate){
          news.push(results[i]);
        }
      };
      console.log("Rss site %s add %s News : ", site.title, news.length);
      async.map(news, News.newAndSave, function (err, result) {
        if (err) return next(err);
        site.lastBuildDate = lastBuildDate;
        site.save(function (err, data) {
          if (err) return next(err);
          res.send({status: 'success'});
        });
      })
    });
  });
};

module.exports.getSiteNews = function (req, res, next) {
  var siteId = req.params.id;
  var page = req.query.page - 1;
  var size = req.query.size;
  if (page < 0 || !page) page = 0;
  if (size < 0 || !size) size = 40;
  News.getNewsBySiteId(siteId, page, size, function (err, news) {
    if (err) return next(err);
    res.send(news);
  })
}

module.exports.getImage = function (req, res, next) {
  var url = req.query.url;
  var md5 = crypto.createHash('md5');
  md5.update(url);
  var key = md5.digest('hex');
  var result = cache.get(key);
  
  if(!_.isEmpty(result)) {
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(result[key]);
  } 
  else {
    siteclient.getImage(url, function (err, data) {
      cache.set(key, data);
      res.setHeader('Content-Type', 'image/jpeg');   
      res.send(data);
    });
  }
}