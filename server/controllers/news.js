var News = require('../models/mongoose/news.js');
var Site = require('../models/mongoose/site.js');
var siteclient = require('../services/siteclient.js');
var async = require('async');

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
  if (page < 0) page = 0;
  if (size < 0) size = 20;
  News.findNewsBySiteId(siteId, page, size, function (err, news) {
    if (err) return next(err);
    res.send(news);
  })
}