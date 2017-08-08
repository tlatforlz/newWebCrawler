angular.module('app.adminurls')
  .config(adminloginConfig);

function adminloginConfig($stateProvider) {
  $stateProvider
    .state('adminurls', {
      url: '/adminurls',
      templateUrl: 'app/components/admin-urls/urls.html',
      controller: 'UrlController',
      controllerAs: 'vm'
    });
}
