(function () {
  angular.module('app.singlepage')
    .controller('SinglePageController', ['$q', '$http', '$state', '$scope', '$stateParams', SinglePageController]);

  function SinglePageController($q, $http, $state, $scope, $stateParams) {
    console.log($stateParams.id);
  }
})();
