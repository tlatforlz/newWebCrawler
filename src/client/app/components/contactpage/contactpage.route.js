angular.module('app.contactpage')
  .config(contactpageConfig);

function contactpageConfig($stateProvider) {
  $stateProvider
    .state('contact', {
      url: '/contact',
      templateUrl: 'app/components/contactpage/contactpage.html',
      controller: 'ContactPageController',
      controllerAs: 'vm'
    });
}
