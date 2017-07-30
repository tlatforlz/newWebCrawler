angular.module('app.search')
  .config(searchConfig);

function searchConfig($stateProvider) {
  $stateProvider
    .state('search', {
      url: '/search/:searchKey/:currentPage/:pageSize',
      templateUrl: 'app/components/search/search.html',
      controller: 'SearchController',
      controllerAs: 'vm'
    });
}
