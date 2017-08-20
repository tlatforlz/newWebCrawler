(function () {
  'use strict';

  angular.module('app')
    .directive('myHeaderAdmin', myHeaderAdmin);

  /* @ngInject */
  function myHeaderAdmin() {
    var directive = {
      restrict: 'EA',
      controller: ['$scope', 'authService', '$state', function ($scope, authService, $state) {
        var vm = this;
        vm.logout = logout;

        function logout() {
          toastr.success(authService.logout());
          $state.go('adminlogin');
        }
      }],
      controllerAs: 'vm',
      scope: {},
      templateUrl: 'app/shared/directives/headeradmin/headeradmin.html'
    };

    return directive;
  }
})();
