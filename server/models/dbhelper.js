var mongoose = require('mongoose'),
  settings = require('../settings');
  
var Schema = mongoose.Schema;
var db = mongoose.createConnection(settings.host, settings.db);
db.on('error', console.error.bind(console, 'Connecting DB ERROR!'));
db.once('open', function() {
  console.log('Connecting DB Success!');
});

module.exports = db;