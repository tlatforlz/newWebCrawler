angular.module('app.adminnews')
  .config(newsConfig);

function newsConfig($stateProvider) {
  $stateProvider
    .state('adminnews', {
      url: '/adminnews',
      templateUrl: 'app/components/admin-news/news.html',
      controller: 'NewsController',
      controllerAs: 'vm'
    });
}
