var SiteController = require('../controllers/site.js');
var NewsController = require('../controllers/news.js');
var UserController = require('../controllers/user.js');

module.exports = function (app) {
  app.get('/sites/:id', SiteController.getById);
  app.get('/sites', SiteController.getAll);
  app.post('/sites', SiteController.add);

  app.get('/startAutoRequestNews', SiteController.startAutoRequestNews);

  app.delete('/sites/stopAutoRequestNews', SiteController.stopAutoRequestNews);

  app.get('/sites/:id/news', NewsController.getSiteNews);
  app.get('/sites/:id/requestNews', NewsController.requestSiteNews);
  

  app.post('/users/add', UserController.add);
  app.post('/users/edit', UserController.edit);
  app.post('/users/login', UserController.login);

  app.get('/image', NewsController.getImage);

}
