(function () {
  'use strict';

  angular.module('app')
    .directive('myHeaderAdmin', myHeaderAdmin);

  /* @ngInject */
  function myHeaderAdmin() {
    var directive = {
      restrict: 'EA',
      controllerAs: 'vm',
      scope: {},
      templateUrl: 'app/shared/directives/headeradmin/headeradmin.html'
    };
    return directive;
  }
})();
