(function () {
  angular.module('app.adminlogin')
    .controller('AdminLoginController', ['$q', '$http', '$state', '$stateParams', '$scope', 'authService', AdminLoginController]);

  function AdminLoginController($q, $http, $state, $stateParams, $scope, authService) {
    var vm = this;
    vm.login = function () {
      var request = {
        email: vm.email,
        password: vm.password
      };
      console.log(request);
      return authService.login(request, vm.remember === true ? 1 : 0).then(function (res) {
        console.log('herere');
        toastr.success(res);
        $state.go('adminpage');
      }, function (err) {
        console.log(err);
        toastr.error(err);
      });
    }
  }
})();
