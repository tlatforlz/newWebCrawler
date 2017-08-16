(function () {
  angular.module('app.adminurls')
    .controller('UrlController', ['$q', '$http', '$state', '$stateParams', '$scope', '$rootScope', '$uibModal', UrlController]);

  function UrlController($q, $http, $state, $stateParams, $scope, $rootScope, $uibModal) {
    var vm = this;
    vm.urls = [];

    function getListUrl() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/url'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    getListUrl().then(
      function (res) {
        console.log(res.urls);
        vm.urls = res.urls;
      });

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
      }).closed.then(function () {
        getListUrl().then(
          function (res) {
            vm.urls = res.urls;
          });
      });
    };

    vm.animationsEnabled = true;
    vm.moreInformation = function (id) {
      $rootScope.id = id;
      console.log($rootScope.id);
      var modalInstance = $uibModal.open({
        animation: vm.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'moreInformation.html',
        controller: 'moreInformation',
        controllerAs: 'vm',
        size: 'lg'
      }).closed.then(function () {
        getListUrl().then(
          function (res) {
            vm.urls = res.urls;
          });
      });
    };
  }

  angular.module('app.adminurls')
    .controller('moreInformation', ['$q', '$http', '$state', '$scope', '$rootScope', '$uibModalInstance', moreInformation]);

  function moreInformation($q, $http, $state, $scope, $rootScope, $uibModalInstance) {
    var vm = this;

    function urlInformation(id) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/url/' + id
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    urlInformation($rootScope.id).then(function (res) {
      vm.urlId = res.url._id;
      vm.urlTitle = res.url.title;
      vm.urlHostname = res.url.hostname;
      vm.path = res.url.path;
    });

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
