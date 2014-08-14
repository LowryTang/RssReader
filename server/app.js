var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('static-favicon');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var http = require('http');

var debug = require('debug')('rss');

var routes = require('./routes');
var settings = require('./settings');

var app = express();

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//help function, deal with put, delete and other http method
// app.use(express.methodOverride());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // cookie 解析中间件

// app.use(session({
//   secret: settings.cookieSecret, //防止窜改cookie 名字
//   key: settings.db, //cookie name
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 30
//   } //30 days
//   // store: new MongoStore({db: settings.db})
// }));
// app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.Router());
// app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  // app.use(express.errorHandler());
}

routes(app);

app.set('port', process.argv[2] || 8000);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
