(function () {
  'use strict';

  angular.module('app')
    .directive('myFooter', myFooter);

  /* @ngInject */
  function myFooter() {
    var directive = {
      restrict: 'EA',
      controllerAs: 'vm',
      scope: {},
      templateUrl: 'app/shared/directives/footer/footer.html'
    };
    return directive;
  }
})();
