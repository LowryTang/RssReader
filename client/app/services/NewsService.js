app.service('NewsService', ['$http', 'config',
  
  function($http, config) {

    this.getNewsBySiteId = function(id, onSuccess, error) {
      var url = config.host + '/sites/' + id + '/news?size=30';
      return $http.get(url, {headers: config.headers}).success(function(data, status, headers, config) {
        var data = data;
        angular.forEach(data, function(item) {
          var results = item.description.match(/https?:\/\/.*?\.(jpg|png|gif|img)/g);
          angular.forEach(results, function(str) {
            var replace = "http://localhost:8000/image?url=" + str;
            // http://oimagec8.ydstatic.com/image?keyfrom=reader&w=500&url=
            // var replace = "http://oimagec8.ydstatic.com/image?keyfrom=reader&w=500&url=" + str;
            item.description = item.description.replace(str, replace);
          })
        })
        return data;
      });
    }

    this.getAllSites = function() {
      return $http.get(config.host + '/sites');
    }
  }
]);
