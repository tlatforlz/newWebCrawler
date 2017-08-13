(function () {
  angular.module('app.admincallspider')
    .controller('CallSpiderController', CallSpiderController);

  CallSpiderController.$inject = ['$q', '$http', '$state', '$stateParams', '$scope', 'NgTableParams',
    '$uibModal', '$rootScope'
  ];

  function CallSpiderController($q, $http, $state, $stateParams, $scope, NgTableParams, $uibModal, $rootScope) {
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

    function callUrl(name, id) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/spider/' + name + '/' + id + '/updateurl'
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

    function updateNews(id, data) {
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: '/api/news/' + id,
        data: data
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    vm.checkAction = function (active, _id) {
      var data = {
        'active': !active
      };
      console.log(data);
      updateNews(_id, data).then(function (res) {
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
      }, function () {});
    };

    vm.callOneUrl = function (_id) {
      getSpider().then(function (res) {
        callUrl(res.spider.crawlingName, _id).then(function (ress) {
          vm.showCallUrl = new String(_id.toString());

          console.log(vm.showCallUrl);
          console.log(_id.toString());
          if (ress.messsage === 'CALL_SUCCESS') {


            setTimeout(function () {
              console.log('5s');
              vm.showCallUrl = false;
              getNewsSpider().then(function (res) {
                vm.listSpider = res.news;
                console.log(res.news.length);
                vm.tableParams = new NgTableParams({
                  page: 1,
                  count: 15,
                  header: false
                }, {
                  dataset: vm.listSpider
                });
              });
            }, 5000);
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
        });
      });
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


    vm.animationsEnabled = true;
    vm.newsDetail = function (_id) {
      $rootScope._id = _id;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'newsDetail.html',
        controller: 'newsDetail',
        controllerAs: 'vm',
        size: 'lg'
      });
    };

    vm.animationsEnabled = true;
    vm.conform = function (_id) {
      $rootScope._id = _id;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'conformDelete.html',
        controller: 'conformDelete',
        controllerAs: 'vm',
        size: 'sm'
      }).closed.then(function () {
        getNewsSpider().then(function (res) {
          vm.listSpider = res.news;
          console.log(res.news.length);
          vm.tableParams = new NgTableParams({
            page: 1,
            count: 15,
            header: false
          }, {
            dataset: vm.listSpider
          });
        });
      });
    };
  }

  angular.module('app.admincallspider')
    .controller('newsDetail', ['$q', '$http', '$state', '$scope', '$rootScope', '$uibModalInstance', newsDetail]);

  function newsDetail($q, $http, $state, $scope, $rootScope, $uibModalInstance) {
    var vm = this;

    function find(_id) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/' + _id,
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }
    find($rootScope._id).then(function (res) {
      vm.title = res.news.title;
      vm.originalLink = res.news.originalLink;
      vm.author = res.news.author;
      vm.createDate = moment(res.news.createDate).format('DD-MM-YYYY');
      vm.spiderId = res.news.spiderId;
      vm.categoryId = res.news.categoryId;
      vm.content = res.news.content;

    });
    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

  angular.module('app.admincallspider')
    .controller('conformDelete', ['$q', '$http', '$state', '$scope', '$rootScope', 'NgTableParams', '$uibModalInstance', conformDelete]);

  function conformDelete($q, $http, $state, $scope, $rootScope, NgTableParams, $uibModalInstance) {
    var vm = this;

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

    function deleteNews(category) {
      var deferred = $q.defer();
      $http({
        method: 'DELETE',
        url: '/api/news/' + $rootScope._id
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }
    vm.ok = function () {
      deleteNews().then(function (res) {
        if (res.message === 'DELETE_SUCCESS') {
          $uibModalInstance.close();
        }
      }, function () {
        vm.isShow = true;
      });
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
