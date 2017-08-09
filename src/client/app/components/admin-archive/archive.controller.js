(function () {
  angular.module('app.adminarchive')
    .controller('ArchiveController', ['$q', '$http', '$state', '$stateParams', '$scope', ArchiveController]);

  function ArchiveController($q, $http, $state, $stateParams, $scope) {
    var vm = this;
    vm.listArchive = [];

    function getListArchive() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/archive'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      })
      return deferred.promise;
    }

    getListArchive().then(
      (res) => {
        vm.listArchive = res.Archives;
      }
    )
  }
})();
