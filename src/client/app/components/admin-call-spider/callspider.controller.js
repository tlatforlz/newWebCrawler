(function () {
  angular.module('app.admincallspider')
    .controller('CallSpiderController', CallSpiderController);

  CallSpiderController.$inject = ['$q', '$http', '$state', '$stateParams', '$scope', 'NgTableParams',
    '$uibModal'
  ];

  function CallSpiderController($q, $http, $state, $stateParams, $scope, NgTableParams, $uibModal) {
    var vm = this;
    vm.listSpider = [];

    function getListSpider() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/spider'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function getNewsSpider(_id) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/spider'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }


    getListSpider().then(function (res) {
      vm.listSpider = res.spiders;
      vm.tableParams = new NgTableParams({
        page: 1,
        count: 15,
        header: false
      }, {
        dataset: vm.listSpider
      });
    });


  }
})();
