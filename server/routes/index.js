var crypto = require('crypto'),
    User = require('../models/user.js');

/*
 * GET home page.
 */
module.exports = function(app) {
  app.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
  });

  app.post('/reg', function (req, res) {
    console.log(req.body);
    var user = new User(req.body);
    user.save(function(err, data){
      if(err){
        res.send(err);
        return;
      }
      res.send(data);
    });
  });

  app.get('/getuser', function (req, res) {
    console.log(req.query.name);
    User.get(req.query.name, function(err, data){
      if(err){
        res.send(err);
        return;
      }
      req.flash('success', data);
      res.send(data);
    })
  });
};