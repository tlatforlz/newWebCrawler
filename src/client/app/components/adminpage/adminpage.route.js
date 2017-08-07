angular.module('app.adminpage')
  .config(adminpageConfig);

function adminpageConfig($stateProvider) {
  $stateProvider
    .state('adminpage', {
      url: '/adminpage',
      templateUrl: 'app/components/adminpage/adminpage.html',
      controller: 'AdminPageController',
      controllerAs: 'vm'
    });
}
