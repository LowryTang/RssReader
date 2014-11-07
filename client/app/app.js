var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'akoenig.deckgrid', 'ngSanitize']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.when('/index', {
      templateUrl: 'app/views/list.html'
    });
    $routeProvider.when('/view2', {
      templateUrl: 'views/partial2.html'
    });
    $routeProvider.otherwise({
      redirectTo: '/index'
    });
  }
]);

app.constant('config', {
  host: 'http://localhost:8000',
  
  headers: {
    Accept: 'application/json'
  }
})

// $('.deckgrid img').on('')
