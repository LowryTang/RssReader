var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  favorSite: Array
});

var User = mongoose.model('User', userSchema);

var UserDAO = function () {};

module.exports = new UserDAO();