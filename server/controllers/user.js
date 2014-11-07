var User = require('../models/user.js');

module.exports.add = function(req, res, next) {
	var obj = req.body;
  User.getByName(obj.username, function (err, user) {
  	if(err) {
  		next(err);
  	}
  	if(user && user.length > 0){
			res.send({status: 'failed', message: 'This username has already been uesd.'});
  	}
  	User.create(obj, function (err, user) {
  		if(err) {
  			next(err);
  		}
  		res.send(user);
  	})
  })
}

module.exports.edit = function(req, res, next) {

}

module.exports.login = function(req, res, next) {
	var obj = req.body;
	if (!(obj.username && obj.password)) {
		res.status(400).send('Bad Request');
	}
	User.getByNameAndPassword(obj, function (err, user) {
		if(err) {
			next(err);
		}
		if(user){
			res.send(user);
		} else {
			res.send({status: false, message: 'Login failed, user not exist'});
		}
	})
}
