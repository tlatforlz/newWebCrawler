(function () {
  angular.module('app.admincategory')
    .controller('CategoryController', ['$q', '$http', '$state', '$stateParams', '$scope', CategoryController]);

  function CategoryController($q, $http, $state, $stateParams, $scope) {
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
  }
})();
