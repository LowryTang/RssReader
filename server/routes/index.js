var SiteController = require('../controllers/site.js');
var NewsController = require('../controllers/news.js');

module.exports = function (app) {
  app.get('/sites/:id', SiteController.getById);
  app.get('/sites', SiteController.getAll);
  app.post('/sites', SiteController.add);

  app.get('/sites/:id/news', NewsController.getSiteNews);
  app.get('/sites/:id/requestnews', NewsController.requestSiteNews);
}
