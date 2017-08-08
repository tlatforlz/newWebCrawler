(function () {
  angular.module('app.admincategory')
    .controller('AddNewCategory', ['$q', '$http', '$state', '$stateParams', '$scope', AddNewCategory]);

  function AddNewCategory($q, $http, $state, $stateParams, $scope) {
    var vm = this;

    $scope.addnewcategory = function () {
      addNewCategory($scope.category).then(
        (res) => {

        }
      );
    }

    function addNewCategory(category) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: 'api/category',
        data: category
      }).then(function successCallback(res) {
        deferred.resolve(res);
      }, function () {
        deferred.reject(null);
      })
    }
  }
})();
