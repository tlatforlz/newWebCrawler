angular.module('app.adminlogin')
  .config(adminloginConfig);

function adminloginConfig($stateProvider) {
  $stateProvider
    .state('adminlogin', {
      url: '/adminlogin',
      templateUrl: 'app/components/adminlogin/adminlogin.html',
      controller: 'AdminLoginController',
      controllerAs: 'vm'
    });
}
