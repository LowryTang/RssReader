var siteclient = require('./siteclient');
var Site = require('../models/site');
var News = require('../models/news');
var settings = require('../settings');
var async = require('async');

var id = null;
module.exports.start = function (callback) {		
	if (id !== null) {
		callback(null, {message: 'Already have a process to get news.'});
	} else {
		scrapeData();
		id = setInterval(function () {
			scrapeData();
		}, settings.interval);

		callback(null, {message: 'Start auto request news'});
	}
}

var processing = false;
function scrapeData() {
	console.log('request all sites news' + new Date().toString());
	if (processing === false){
		processing = true;

		Site.getAll(function (err, sites) {
			if (err) throw err;
			async.map(sites, getNewsAndSave, function (err, results) {
				if (err) throw err;
				processing = false;
			})
		})
	}
}

module.exports.stop = function (callback) {
	if (id !== null){
		clearInterval(id);
		callback(null, {message: 'clear auto request.'})
	} else {
		callback(null, {message: 'no process to clear.'});
	}
}

function getNewsAndSave (site, callback) {
  siteclient.getSiteNews(site, function (err, results, lastBuildDate) {
    if (err) return callback(err);
    var news = [];
    var bigDate = lastBuildDate > site.lastBuildDate ? lastBuildDate : site.lastBuildDate;
    for (var i = 0; i < results.length; i++) {
      if (results[i].pubDate > site.lastBuildDate || !site.lastBuildDate){
        news.push(results[i]);

        if (results[i].pubDate > bigDate) {
        	bigDate = results[i].pubDate;
        }
      }
    };
    console.log("Rss site %s add %s News : ", site.title, news.length);
    async.map(news, News.newAndSave, function (err, result) {
      if (err) throw err;
      if (bigDate > lastBuildDate) {
      	lastBuildDate = bigDate;
      }
      site.lastBuildDate = lastBuildDate;
      site.save(callback);
    })
  });
}