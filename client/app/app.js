var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'akoenig.deckgrid']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/index', {
      templateUrl: 'views/partial1.html'
    });
    $routeProvider.when('/view2', {
      templateUrl: 'views/partial2.html'
    });
    $routeProvider.otherwise({
      redirectTo: '/index'
    });
  }
]);
