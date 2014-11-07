module.exports = {
  cookieSecret: 'rssRead',
  db: 'rss',
  host: 'localhost',

  cacheOptions: { // seconds
  	stdTTL: 60 * 60 * 24 * 1, //one day
  	checkperiod: 60 * 60 * 2 // 2 hours
  },

  interval: 1000 * 60 * 30
};