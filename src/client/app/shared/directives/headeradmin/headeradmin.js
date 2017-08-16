(function () {
  'use strict';

  angular.module('app.headeradmin')
    .directive('myHeaderAdmin', myHeaderAdmin);

  /* @ngInject */
  function myHeaderAdmin() {
    var directive = {
      restrict: 'EA',
      controller: 'AdminPageController',
      controllerAs: 'vm',
      scope: {},
      templateUrl: 'app/shared/directives/headeradmin/headeradmin.html'
    };
    return directive;
  }
})();
