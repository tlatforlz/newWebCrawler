(function () {
  angular.module('app.adminarchive')
    .controller('ArchiveController', ['$q', '$http', '$state', '$stateParams', '$scope', '$rootScope', '$uibModal', 'authService', ArchiveController]);

  function ArchiveController($q, $http, $state, $stateParams, $scope, $rootScope, $uibModal, authService) {
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
      });
      return deferred.promise;
    }

    getListArchive()
      .then(function (res) {
        vm.listArchive = res.Archives;
      })

    vm.animationsEnabled = true;
    vm.addCategoryInArchive = function (id) {
      $rootScope.id = id;
      console.log(id);
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'addCategory2.html',
        controller: 'addCategoryInArchive',
        controllerAs: 'vm',
        size: 'lg'
      }).closed.then(function () {
        getListArchive().then(
          function (res) {
            vm.listArchive = res.Archives;
          });
      });
    };
    //addCategoryInArchive
  }

  angular.module('app.adminarchive')
    .controller('addCategoryInArchive', ['$q', '$http', '$state', '$stateParams', '$scope', '$rootScope', '$uibModalInstance', addCategoryInArchive]);

  function addCategoryInArchive($q, $http, $state, $stateParams, $scope, $rootScope, $uibModalInstance) {
    var vm = this;

    vm.listCategory = [];
    //$rootScope.id = id;
    function getArchiveById(id) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/archive/' + id
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function getListCategory() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/category'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }




    getArchiveById($rootScope.id).then(function (res) {
      vm.buttonRemove = function (cateid) {
        var check = false;
        for (var index = 0; index < res.Archive.listCategory.length; index++) {
          if (res.Archive.listCategory[index] === cateid) {
            check = true;
          }
        }
        return check;
      }
      vm.buttonAdd = function (cateid) {
        var check = true;
        for (var index = 0; index < res.Archive.listCategory.length; index++) {
          if (res.Archive.listCategory[index] === cateid) {
            check = false;
          }
        }
        return check;
      }
    });

    //http://localhost:8001/api/archive/addCategory/597cbdde0749a02b28b7f09b
    function addCate(cateid) {
      var deferred = $q.defer();
      var data = {
        "CateId": cateid
      };
      $http({
        method: 'PUT',
        url: '/api/archive/addCategory/' + $rootScope.id,
        data: data
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function removeCate(cateid) {
      var deferred = $q.defer();
      var data = {
        "CateId": cateid
      };
      $http({
        method: 'PUT',
        url: '/api/archive/removeCategory/' + $rootScope.id,
        data: data
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    vm.add = function (cateid) {
      addCate(cateid).then(function (res) {
        getListCategory().then(
          function (res) {
            vm.listCategory = res.categorys;
          });
        getArchiveById($rootScope.id).then(function (res) {
          vm.buttonRemove = function (cateid) {
            var check = false;
            for (var index = 0; index < res.Archive.listCategory.length; index++) {
              if (res.Archive.listCategory[index] === cateid) {
                check = true;
              }
            }
            return check;
          }
          vm.buttonAdd = function (cateid) {
            var check = true;
            for (var index = 0; index < res.Archive.listCategory.length; index++) {
              if (res.Archive.listCategory[index] === cateid) {
                check = false;
              }
            }
            return check;
          }
        });
      })
    };


    vm.remove = function (cateid) {
      removeCate(cateid).then(function (res) {
        getListCategory().then(
          function (res) {
            vm.listCategory = res.categorys;
          });
        getArchiveById($rootScope.id).then(function (res) {
          vm.buttonRemove = function (cateid) {
            var check = false;
            for (var index = 0; index < res.Archive.listCategory.length; index++) {
              if (res.Archive.listCategory[index] === cateid) {
                check = true;
              }
            }
            return check;
          }
          vm.buttonAdd = function (cateid) {
            var check = true;
            for (var index = 0; index < res.Archive.listCategory.length; index++) {
              if (res.Archive.listCategory[index] === cateid) {
                check = false;
              }
            }
            return check;
          }
        });
      })
    };

    getListCategory().then(
      function (res) {
        vm.listCategory = res.categorys;
      });


    vm.ok = function () {
      $uibModalInstance.close();
      // conformEdit().then(function (res) {
      //   if (res.message === 'CREATE_SUCCESS') {
      //     $uibModalInstance.close();
      //   }
      // }, function () {
      //   vm.isShow = true;
      // });
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
