(function () {
  angular.module('app.admincallspider')
    .controller('CallSpiderController', CallSpiderController);

  CallSpiderController.$inject = ['$q', '$http', '$state', '$stateParams', '$scope', 'NgTableParams',
    '$uibModal'
  ];

  function CallSpiderController($q, $http, $state, $stateParams, $scope, NgTableParams, $uibModal) {
    var vm = this;
    vm.listSpider = [];


    function getNewsSpider() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/spider/getNewsCall/' + $stateParams.id
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function getSpider() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/spider/' + $stateParams.id
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function call(name) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/spider/' + name
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function update(name) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/spider/' + name + '/update'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function getNewsNone() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/spider/getNewsNone/' + $stateParams.id
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    vm.callSpider = function () {
      getSpider().then(function (res) {
        call(res.spider.crawlingName).then(function (ress) {
          if (ress.spider === "CALL_SUCCESS") {
            getNewsSpider().then(function (res) {
              vm.listSpider = res.news;
              vm.tableParams = new NgTableParams({
                page: 1,
                count: 15,
                header: false
              }, {
                dataset: vm.listSpider
              });
            });
          }
        })
      })
    }

    vm.updateSpider = function () {
      getSpider().then(function (res) {
        update(res.spider.crawlingName).then(function (ress) {
          // while (true) {
          //   setTimeout(function () {
          //     getNewsSpider().then(function (news) {
          //       vm.listSpider = news.news;
          //       vm.tableParams = new NgTableParams({
          //         page: 1,
          //         count: 15,
          //         header: false
          //       }, {
          //         dataset: vm.listSpider
          //       });
          //     });
          //   }, 5000);
          //   getNewsNone().then(function (none) {
          //     if (none.news.length === 0) {
          //       break;
          //     }
          //   })
          // }
        })
      })
    }
    getNewsSpider().then(function (res) {
      vm.listSpider = res.news;
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
