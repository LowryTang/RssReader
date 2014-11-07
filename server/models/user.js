var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  favorSite: Array
});

var User = mongoose.model('User', userSchema);

var UserDAO = function() {};

module.exports = new UserDAO();

UserDAO.prototype.create = function(obj, callback) {
	var user = new User();
	user.username = obj.username;
	user.password = obj.password;
	user.email = obj.email;
	user.favorSite = [];
	user.save(callback);
}

UserDAO.prototype.getByName = function(username, callback) {
	User.find({username: username}, {__v: 0}, callback);
}

UserDAO.prototype.getById = function(id, callback) {
	User.findOne({_id: id}, {__v: 0}, callback);
}

UserDAO.prototype.getAll = function(callback) {
	User.find(null, {__v: 0, favorSite: 0}, callback);
}

UserDAO.prototype.getByNameAndPassword = function(obj, callback) {
	User.findOne({username: obj.username, password: obj.password}, {__v: 0}, callback);
}
