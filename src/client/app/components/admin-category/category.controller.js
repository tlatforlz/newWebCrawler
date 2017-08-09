(function () {
  angular.module('app.admincategory')
    .controller('CategoryController', ['$q', '$http', '$state', '$stateParams', '$scope', '$rootScope', '$uibModal', CategoryController]);

  function CategoryController($q, $http, $state, $stateParams, $scope, $rootScope, $uibModal) {
    var vm = this;
    vm.listCategory = [];

    function getListCategory() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/category'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      })
      return deferred.promise;
    }

    getListCategory().then(
      (res) => {
        vm.listCategory = res.categorys;
      }
    )

    vm.animationsEnabled = true;
    vm.open = function (size) {
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'addNewCategory.html',
        controller: 'addNewCategory',
        controllerAs: 'vm',
        size: size
      });
    }

    vm.animationsEnabled = true;
    vm.editCate = function (id) {
      $rootScope.id = id;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'editCategory.html',
        controller: 'editCategory',
        controllerAs: 'vm'
      });
    }

    vm.animationsEnabled = true;
    vm.conform = function (id) {
      $rootScope.id = id;
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'conformDelete.html',
        controller: 'conformDelete',
        controllerAs: 'vm',
        size: 'lg'
      });
    }
  }

  angular.module('app.admincategory')
    .controller('addNewCategory', ['$q', '$http', '$state', '$stateParams', '$scope', '$uibModalInstance', addNewCategory]);

  function addNewCategory($q, $http, $state, $stateParams, $scope, $uibModalInstance) {
    var vm = this;

    function add(category) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/api/category',
        data: category
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      })
      return deferred.promise;
    }
    vm.ok = function () {
      var data = {
        "name": vm.name,
        "keys": vm.key
      };
      add(data).then(function (res) {
        if (res.message === 'CREATE_SUCCESS') {
          location.reload();
          $uibModalInstance.close();
        }
      }, function () {
        vm.isShow = true;
      })
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
  angular.module('app.admincategory')
    .controller('editCategory', ['$q', '$http', '$state', '$stateParams', '$scope', '$rootScope', '$uibModalInstance', editCategory]);

  function editCategory($q, $http, $state, $stateParams, $scope, $rootScope, $uibModalInstance) {
    var vm = this;

    function getCategory() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/category/' + $rootScope.id
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      })
      return deferred.promise;
    }
    getCategory().then(function (res) {
      console.log(res);
      vm.name = res.category.name;
      vm.key = res.category.keys;
    })

    function conformEdit() {
      var data = {
        "name": vm.name,
        "key": [vm.keys]
      };
      var deferred = $q.defer();
      $http({
        method: 'PUT',
        url: '/api/category/' + $rootScope.id,
        data: data
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      })
      return deferred.promise;
    }
    vm.ok = function () {
      conformEdit().then(function (res) {
        if (res.message === 'CREATE_SUCCESS') {
          location.reload();
          $uibModalInstance.close();
        }
      }, function () {
        vm.isShow = true;
      })
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
  angular.module('app.admincategory')
    .controller('conformDelete', ['$q', '$http', '$state', '$stateParams', '$scope', '$rootScope', '$uibModalInstance', conformDelete]);

  function conformDelete($q, $http, $state, $stateParams, $scope, $rootScope, $uibModalInstance) {
    var vm = this;

    function deleteCategory(category) {
      var deferred = $q.defer();
      $http({
        method: 'DELETE',
        url: '/api/category/' + $rootScope.id
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      })
      return deferred.promise;
    }
    vm.ok = function () {
      deleteCategory().then(function (res) {
        if (res.message === 'DELETE_SUCCESS') {
          location.reload();
          $uibModalInstance.close();
        }
      }, function () {
        vm.isShow = true;
      })
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
