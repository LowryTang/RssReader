var News = require('../models/mongoose/news.js');
var Site = require('../models/mongoose/site.js');
var siteclient = require('../services/siteclient.js');


module.exports.requestSiteNews = function (req, res, next) {
  var siteId = req.params.id;
  Site.getById(siteId, function (err, site) {
    if (err) return next(err);
    siteclient.getSiteNews(site, function (err, results) {
      if (err) return next(err);
      for (var i = 0; i < results.length; i++) {
        if (results[i].pubDate > site.lastBuildDate || !site.lastBuildDate){
          News.newAndSave(results[i]);
        }
      };
      res.send({status: 'success'});
    });
  });
};

module.exports.getSiteNews = function (req, res, next) {
  var siteId = req.params.id;
  News.findNewsBySiteId(siteId, null, null, function (err, news) {
    if (err) return next(err);
    res.send(news);
  })
}