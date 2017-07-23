angular.module('app.about')
  .config(contactpageConfig);

function contactpageConfig($stateProvider) {
  $stateProvider
    .state('about', {
      url: '/about',
      templateUrl: 'app/components/about/about.html',
      controller: 'AboutController',
      controllerAs: 'vm'
    });
}
