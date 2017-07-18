angular.module('app.header')
  .config(homepageConfig);

function homepageConfig($stateProvider) {
  $stateProvider
    .state('header', {
      url: '/header',
      templateUrl: 'app/components/header/header.html',
      controller: 'HeaderController',
      controllerAs: 'vm'
    });
}
