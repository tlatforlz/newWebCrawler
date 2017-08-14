(function () {
  angular.module('app.adminnews')
    .controller('NewsController', ['$q', '$http', '$state', '$stateParams', '$scope', '$rootScope', 'NgTableParams', '$uibModal', NewsController]);

  function NewsController($q, $http, $state, $stateParams, $scope, $rootScope, NgTableParams, $uibModal) {
    var vm = this;
    vm.listNews = [];

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
      updateNews(_id, data).then(function (res) {
        getListNews().then(function (res) {
          vm.listNews = res.news;
          vm.tableParams = new NgTableParams({
            page: 1,
            count: 15,
            header: false
          }, {
            dataset: vm.listNews
          });
        });
      }, function () {});
    };
    getListNews().then(function (res) {
      vm.listNews = res.news;
      vm.tableParams = new NgTableParams({
        page: 1,
        count: 15,
        header: false
      }, {
        dataset: vm.listNews
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
    //conform
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
        getListNews().then(function (res) {
          vm.listNews = res.news;
          vm.tableParams = new NgTableParams({
            page: 1,
            count: 15,
            header: false
          }, {
            dataset: vm.listNews
          });
        });
      });
    };
  }

  angular.module('app.adminnews')
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

  angular.module('app.adminnews')
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
