app.controller('HomeController', function($scope, NewsService) {
  NewsService.getNewsBySiteId("53df5030dba4433e2afc5464", function(news) {
    $scope.news = news;
    console.log(news.length);
  });

  $scope.init = function (arguments) {
  	
  }
});
