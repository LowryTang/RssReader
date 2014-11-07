var express = require('express');
var path = require('path');
var routes = require('./routes');
var settings = require('./settings');
var db = require('./models/index.js');
 
// var flash = require('connect-flash');

var bodyParser = require('body-parser'); 
var cookieParser = require('cookie-parser');
var session = require('express-session');
var multer = require('multer'); // support multi data type
var methodOverride = require('method-override');
var logger = require('morgan'); // logger help
var favicon = require('serve-favicon'); 

var errorHandler = require('errorhandler');
var debug = require('debug')('rss');

var app = express();

// all environments
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');


//help function, deal with put, delete and other http method
// app.use(express.methodOverride());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev', {immediate: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // cookie 解析中间件

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// app.use(session({
//   secret: settings.cookieSecret, //防止窜改cookie 名字
//   key: settings.db, //cookie name
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 30
//   } //30 days
//   // store: new MongoStore({db: settings.db})
// }));
// app.use(flash());

// app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.Router());
// app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

routes(app);

// var cluster = require('cluster');
// var numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//   // Fork workers.
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', function(worker, code, signal) {
//     console.log('worker ' + worker.process.pid + ' died');
//   });
// } else {


app.set('port', process.argv[2] || 8000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
// }
