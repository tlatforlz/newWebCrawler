(function () {
  angular.module('app.header')
    .controller('HeaderController', ['$q', '$http', '$state', HeaderController]);

  function HeaderController($q, $http, $state) {
    var vm = this;
    vm.listTop5 = [];
    vm.title = "12321321";

    function getTop5() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/getNews/getNewsNearest'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }




  }
})();
