angular.module('app.adminarchive')
  .config(archiveConfig);

function archiveConfig($stateProvider) {
  $stateProvider
    .state('adminarchive', {
      url: '/adminarchive',
      templateUrl: 'app/components/admin-archive/archive.html',
      controller: 'ArchiveController',
      controllerAs: 'vm'
    });
}
