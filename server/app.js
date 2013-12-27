
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express),
    settings = require('./settings'),
    flash = require('connect-flash'),
    News = require('./models/news.js');


var app = express();

// all environments
app.set('port', process.argv[2] || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon()); // icon (__dirname + '/public/image/XXXX.ico')
app.use(express.logger('dev')); // console log

/**
 * use app.use(express.bodyParser());
 * like use :
 * app.use(express.json()); 
 * app.use(express.urlencoded());
 * app.use(express.multipart());
 */
app.use(express.json());
app.use(express.urlencoded());

//help function, deal with put, delete and other http method
app.use(express.methodOverride());

app.use(express.cookieParser()); // cookie 解析中间件
app.use(express.session({
  secret: settings.cookieSecret, //防止窜改cookie 名字
  key: settings.db, //cookie name
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}, //30 days
  store: new MongoStore({db: settings.db})
}));
app.use(flash());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);
// 
//routes(app);
var test = new News({host:"http://voice.hupu.com/generated/voice/news_nba.xml",name:"hupu"});
test.getNews();
// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });
