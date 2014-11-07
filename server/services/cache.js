var nodeCache = require('node-cache');
var setting = require('../settings');

var myCache = new nodeCache(setting.cacheOptions);

module.exports = myCache;