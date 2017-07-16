angular.module('app.homepage')
  .config(homepageConfig);

function homepageConfig($stateProvider) {
  $stateProvider
    .state('layout.homepage', {
      url: '/',
      templateUrl: 'app/components/homepage/homepage.html',
      controller: 'HomePageController',
      controllerAs: 'vm'
    });
}
