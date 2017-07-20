angular.module('app.singlepage')
  .config(singlepageConfig);

function singlepageConfig($stateProvider) {
  $stateProvider
    .state('singlePage', {
      url: '/singlepage',
      templateUrl: 'app/components/singlepage/singlepage.html',
      controller: 'SinglePageController',
      controllerAs: 'vm'
    });
}
