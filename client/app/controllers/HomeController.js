app.controller('HomeController', function($scope, NewsService) {
  'use strict';

  NewsService.getAllSites().then(function (data) {
    $scope.sites = data.data;
  })
  $scope.select = function (site) {
    $scope.news = [];  
    NewsService.getNewsBySiteId(site._id).then(function (news) {
      $scope.news=$scope.news.concat(news);
    })
  }
});
