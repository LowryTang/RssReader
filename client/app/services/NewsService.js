app.service('NewsService', ['$http',
  function($http) {
    this.getNewsBySiteId = function(id, onSuccess, error) {
      $http({
        method: 'GET',
        url: 'http://localhost:8000/sites/' + id + '/news',
        headers: {
          Accept: 'application/json'
        }
      }).success(function(data, status, headers, config) {
        onSuccess(data);
      }).error(function(data, status, headers, config) {
        console.log(data, status, headers, config);
      })
    }
  }
]);
