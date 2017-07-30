(function () {
  angular.module('app.header', []).controller('SearchHeader', ['$scope', '$window', function ($scope, $window) {
    var searchString = $scope.searchString;
    console.log(searchString);
    $scope.submit = function () {
      $window.location.href = "search/" + $scope.searchString + "/1/8";
    }
  }])
})();
