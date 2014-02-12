var settings = require('../settings'),
  Db = require('mongodb').Db,
  Connection = require('mongodb').Connection,
  Server = require('mongodb').Server,
  mongodb = new Db(settings.db, new Server(settings.host, Connection.DEFAULT_PORT), {
    safe: true
  });

function DB() {};

DB.prototype.openDB = function(callback) {
  mongodb.open(function(err, db) {
    if (err) {
      console.log("R001: DB connect error");
      mongodb.close();
    }
    callback(err, db);
  });
}

DB.prototype.openCollection = function(name, callback) {
  mongodb.open(function(err, db) {
    if (err) {
      console.log("R001: DB connect error");
      mongodb.close();
      return callback(err);
    }
    db.collection(name, function (err, collection) {
    	if(err){
    		console.log("R001: get collection error :", name);
    		mongodb.close();
    	}
    	callback(err, collection);
    })
  });
}

var db = new DB();
module.exports = db;
