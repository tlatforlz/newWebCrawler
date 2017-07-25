angular.module('app.category')
  .config(categorypageConfig);

function categorypageConfig($stateProvider) {
  $stateProvider
    .state('category', {
      url: '/category/:path/:currentPage/:pageSize',
      templateUrl: 'app/components/categorypage/categorypage.html',
      controller: 'CategoryController',
      controllerAs: 'vm'
    });
}
