(function () {
  'use strict';

  angular.module('app')
    .directive('mySearchKey', mySearchKey);

  /* @ngInject */
  function mySearchKey() {
    return function (scope, element, attrs) {
      element.bind('keydown keypress', function (event) {
        scope.$apply(function () {
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      });
    };
  }
})();
