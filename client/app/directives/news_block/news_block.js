
app.directive('newsblock', function() {
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: true, // {} = isolate, true = child, false/undefined = no change
    controller: function($scope, $element, $attrs, $transclude) {

    },
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
    // template: '',
    templateUrl: 'directives/news_block/news_block.html',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, transclude) {
    //   console.log('complie');
    // },
    link: function($scope, iElm, iAttrs, controller) {
      // console.log($scope.news, 'link');
      $scope.$watch('news', function(results) {
        // console.log(results);
        if (results) {
          init(results);
        }
      });
      var h1 = h2 = h3 = 0;
      var init = function(results) {
        var elements = iElm.children().children();
        for (var i = 0; i < elements.length; i++) {
          var obj = elements[i];
          var css = obj.style;
          var left;
          if (i % 3 == 0) {
            css.left = 0 + 'px';
            css.top = h1 + 'px';
            h1 += obj.offsetHeight;
          } else if (i % 3 == 1) {
            left = obj.offsetWidth + obj.offsetLeft * 2;
            css.left = left + 'px';
            css.top = h2 + 'px';
            h2 += obj.offsetHeight;
          } else if (i % 3 == 2) {
            left = obj.offsetWidth * 2 + obj.offsetLeft * 4;
            css.left = left + 'px';
            css.top = h3 + 'px';
            h3 += obj.offsetHeight;
          }
        };
      }
    }
  };
});
