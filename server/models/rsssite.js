// var webservice = require('./webservice.js'),
//     Utilities = require('../util/Utilities.js'),
//     mongodb = require('./db.js');

// function Site(params) {
//     this.name = params.name;
//     this.host = params.host;
//     this.description = params.description;
//     this.lastBuildDate;
//     this.news = [];
// }

// module.exports = Site;

// Site.prototype.save = function (callback) {
//     var site = {
//         name: this.name,
//         host: this.host,
//         createTime: Utilities.now(),
//         lastModified: Utilities.now()
//     };
//     var self = this;
//     mongodb.openCollection('sites', function (collection) {
//         collection.update({
//             host: self.host
//         }, {
//             $set: site
//         }, {
//             upsert: true,
//             safe: true
//         }, function (err, site) {
//             console.log("done");
//             if (err) {
//                 console.error(err);;
//                 mongodb.close();
//                 return callback(err);
//             }
//             console.log(site);
//             mongodb.close();
//             callback(null, site[0]);
//         });
//     })
// }

// Site.prototype.update = function (callback) {
//     var site = {
//         lastBuildDate: this.lastBuildDate,
//         description: this.description,
//         title: this.title,
//         lastModified: Utilities.now()
//     }
//     var self = this;
//     console.log("update site");
//     mongodb.openCollection('sites', function (collection) {
//         debugger;
//         collection.update({
//             host: self.host
//         }, {
//             $set: site
//         }, {
//             upsert: true,
//             safe: true
//         }, function (err, site) {
//             debugger;
//             console.log("update done");
//             if (err) {
//                 console.error(err);;
//                 mongodb.close();
//                 return callback(err);
//             }
//             console.log(site);
//             mongodb.close();
//             callback(null, site[0]);
//         });
//     })
// }

// Site.prototype.requestNews = function (callback) {
//     var self = this;
//     webservice.get(this.host, function (err, data) {
//         if (err) {
//             console.error(err);
//             return callback(err);
//         }
//         var lastBuildDate = new Date(data.rss.channel[0].lastBuildDate[0]).getTime();
//         if (lastBuildDate < self.lastBuildDate) {
//             console.log("RSS" + self.name + "not publish new information!");
//             return;
//         }
//         var news = transformNews(data.rss.channel[0].item, self.lastBuildDate);
//         self.lastBuildDate = lastBuildDate;
//         self.description = data.rss.channel[0].description[0];
//         self.title = data.rss.channel[0].title[0];
//         debugger;
//         self.update(function (err, data) {
//             if (err) {
//                 console.log(err);
//                 return callback(err);
//             }
//             if (news.length > 0) {
//                 self.save2DB(news);
//             }
//             // callback(null);
//         });
//     });
// }

// function transformNews(news, time) {
//     if (news.length > 0) {
//         var results = [];
//         for (var i = 0; i < news.length; i++) {
//             if (new Date(news[i].pubDate).getTime() < time) {
//                 continue;
//             }
//             var temp = {};
//             temp.title = news[i].title[0];
//             temp.link = news[i].link[0];
//             temp.description = news[i].description[0];
//             temp.pubDate = news[i].pubDate[0];
//             results.push(temp);
//         };
//         return results;
//     }
// }

// Site.prototype.save2DB = function (results) {
//     console.log(results.length);
//     var self = this;
//     mongodb.openCollection('sites', function (collection) {
//         collection.update({
//             host: self.host
//         }, {
//             $pushAll: {
//                 news: results
//             }
//         }, {
//             w: 1,
//             upsert: true
//         }, function (err, site) {
//             if (err) {
//                 mongodb.close();
//                 return callback(err);
//             }
//             mongodb.close();
//         });
//     })
// }

// Site.getNews = function (name, params, callback) {
//     mongodb.openCollection('sites', function (collection) {
//         collection.findOne({
//             name: name
//         }, function (err, result) {
//             mongodb.close();
//             callback(err, result.news);
//         })
//     });

// }
