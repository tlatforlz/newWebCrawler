angular.module('app.admincategory')
  .config(admincategoryConfig);

function admincategoryConfig($stateProvider) {
  $stateProvider
    .state('admincategory', {
      url: '/admincategory',
      templateUrl: 'app/components/admin-category/category.html',
      controller: 'CategoryAdminController',
      controllerAs: 'vm'
    });
}
