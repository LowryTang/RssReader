var Site = require('../models/site.js');
var siteclient = require('../services/siteclient.js');
var scraper = require('../services/scraper.js');

module.exports.add = function (req, res, next) {
  var url = req.body.url
  Site.getByUrl(url, function (err, site) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (site.length > 0) {
      res.send({status: 'failed', message: 'Already have this site.'});
    } else {
      var site = {};
      site.url = url;
      siteclient.getSiteInfo(site, function (err, data) {
        if (err) return next(err);
        Site.newAndSave(site, function (err, site){
          if (err) {
            console.log(err);
            next(err);
          }
          res.send(site);
        });
      });
    }
  })
}

module.exports.getById = function (req, res, next) {
  var id = req.body.id;
}

module.exports.getAll = function (req, res, next) {
  Site.getAll(function (err, sites) {
    if (err) return next(err);
    res.send(sites);
  })
}

module.exports.startAutoRequestNews = function (req, res, next) {
  scraper.start(function (err, data) {
    if(err) throw err;
    res.send(data);
  });
  
}

module.exports.stopAutoRequestNews = function (req, res, next) {
  scraper.stop(function (err, data) {
    res.send(data);
  });
  
}