(function () {
  'use strict';

  angular.module('app.homepage')
    .directive('recentPost', recentPost);

  /* @ngInject */

  console.log('call here');

  function recentPost() {
    var directive = {
      restrict: 'EA',
      controllerAs: 'vm',
      scope: {},
      templateUrl: 'app/shared/directives/recentpost/recentpost.html'
    };


    return directive;
  }
})();
