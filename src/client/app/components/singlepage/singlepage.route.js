angular.module('app.singlepage')
  .config(singlepageConfig);

function singlepageConfig($stateProvider) {
  $stateProvider
    .state('singlepage', {
      url: '/singlepage/:id',
      templateUrl: 'app/components/singlepage/singlepage.html',
      controller: 'SinglePageController',
      controllerAs: 'vm'
    });
}
