var http = require('http'),
  url = require('url'),
  BufferHelper = require('../util/bufferhelper'),
  iconv = require('iconv-lite'),
  parser = require('xml2js');

function sendRequest(site, callback) {
  http.get(site.url, function(res) {
    console.log('getSiteInfo status code : ', res.statusCode);
    var buffer = new BufferHelper();
    res.on('data', function(chunk) {
      buffer.add(chunk);
    });
    res.on('end', function() {
      var contentType = res.headers['content-type'];
      var charset = contentType.split(';')[1];
      if (charset) {
        charset = charset.trim().split('=')[1];
      } else {
        var str = Buffer.concat(buffer.buffers.slice(0, 1)).toString();
        charset = str.match(/encoding="(.*?)"/)[1];
      }
      console.log('charset : ', charset);
      var result = iconv.decode(buffer.toBuffer(), charset);
      var options = {
        normalize: true,
      };
      parser.parseString(result, options, function(err, data) {
        if (err) return callback(err);
        callback(null, data);
      });
    })
  }).on('err', function(err) {
    console.log('getSiteInfo err : ', e.message);
    callback(err);
  })
}

module.exports.getSiteInfo = function(site, callback) {
  sendRequest(site, function(err, data) {
    if (err) return callback(err);
    site.title = data.rss.channel[0].title[0];
    site.description = data.rss.channel[0].description[0];
    site.link = data.rss.channel[0].link[0];
    var lastBuildDate = data.rss.channel[0].lastBuildDate;
    site.lastBuildDate = lastBuildDate ? new Date(lastBuildDate[0]) : new Date();
    callback(null, site);
  })
};

module.exports.getSiteNews = function(site, callback) {
  sendRequest(site, function(err, data) {
    if (err) return callback(err);
    var items = data.rss.channel[0].item;
    var lastBuildDate = new Date(data.rss.channel[0].lastBuildDate[0]);
    var results = [];
    for (var i = 0; i < items.length; i++) {
      var temp = {};
      temp.title = items[i].title[0];
      temp.link = items[i].link[0];
      temp.description = items[i].description[0];
      temp.pubDate = new Date(items[i].pubDate[0]);
      temp.siteId = site._id;
      results.push(temp);
    };
    callback(null, results, lastBuildDate);
  })
};

module.exports.getImage = function(url, callback) {
  http.get(url, function(res) {

    var buffer = new BufferHelper();
    res.on('data', function(chunk) {
      buffer.add(chunk);
    });

    res.on('end', function() {
      var data = buffer.toBuffer();
      callback(null, data);
    })
  });
};
