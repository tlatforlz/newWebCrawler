(function () {
  angular.module('app.adminnews')
    .controller('NewsController', ['$q', '$http', '$state', '$stateParams', '$scope', NewsController]);

  function NewsController($q, $http, $state, $stateParams, $scope) {
    var vm = this;
    vm.listNews = [];

    function getListNews() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    getListNews().then(function (res) {
      vm.listNews = res.news;
    });
  }
})();
