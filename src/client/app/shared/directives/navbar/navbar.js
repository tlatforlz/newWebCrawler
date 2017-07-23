(function () {
  'use strict';

  angular.module('app')
    .directive('myNavbar', myNavbar);

  /* @ngInject */
  function myNavbar() {
    var directive = {
      restrict: 'EA',
      controllerAs: 'vm',
      scope: {},
      templateUrl: 'app/shared/directives/navbar/navbar.html'
    };
    return directive;
  }
})();
