(function () {
  angular.module('app.admincategory')
    .controller('CategoryController', ['$q', '$http', '$state', '$stateParams', '$scope', '$uibModal', CategoryController]);

  function CategoryController($q, $http, $state, $stateParams, $scope, $uibModal) {
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
  }

  angular.module('app.admincategory').controller('addNewCategory', function ($uibModalInstance) {
    var vm = this;

    vm.ok = function () {
      var data = {
        "name": vm.name,
        "keys": [vm.key]
      };

      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
})();
