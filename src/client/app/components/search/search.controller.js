(function () {
  angular.module('app.search')
    .controller('SearchController', ['$q', '$http', '$state', '$stateParams', '$scope', SearchController]);

  function SearchController($q, $http, $state, $stateParams, $scope) {
    var vm = this;
    vm.listTop3 = [];
    vm.listPopular = [];
    vm.listSuggest = [];
    vm.listContent = [];
    vm.currentPage = 1;
    vm.pageSize = 8;
    vm.totalPage = 1;
    vm.path = $stateParams.path;
    vm.currentPage = $stateParams.currentPage;
    vm.path = $stateParams.searchKey;
    vm.begin = $stateParams.currentPage;
    vm.all = 0;
    $scope.range = function (count) {
      return Array.apply(0, Array(+count)).map(function (value, index) {
        return index;
      });
    }
    $scope.activeSelect = function (i) {
      if (parseInt(i) === parseInt(vm.currentPage)) {
        return "active-select";
      }
      return "";
    }

    function getContent() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/getNews/getNewsSearch/pagination/' + $stateParams.searchKey + '/' + $stateParams.currentPage + '/' + $stateParams.pageSize
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function getTop3() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/getNews/getNewsNearest'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function getTopPopular() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/getNews/getNewsMostPopular'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function getSuggest() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/getHome/getNewsHome'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }


    getContent().then(
      (res) => {
        vm.all = res.totalResult;
        vm.totalPage = res.totalPage;
        vm.totalPage = parseInt($stateParams.currentPage) + 8;

        if (vm.totalPage > res.totalPage) {
          vm.totalPage = res.totalPage;
          vm.begin = vm.totalPage - 8;
        }
        var index = 0;
        for (var i in res.items) {
          if (res.items[i]) {
            res.items[i].createDate = moment(res.items[i].createDate).format('DD-MM-YYYY');
            res.items[i].updateDate = moment(res.items[i].updateDate).format('DD-MM-YYYY');
            vm.listContent.push(res.items[i]);
          }
        }
      }
    ).catch((err) => {
      $state.go('404');
    });

    getTop3().then(
      (res) => {
        var index = 0;
        for (var i in res.news) {
          if (index === 3) {
            break;
          }
          if (res.news[i]) {
            res.news[i].createDate = moment(res.news[i].createDate).format('DD-MM-YYYY');
            res.news[i].updateDate = moment(res.news[i].updateDate).format('DD-MM-YYYY');
            vm.listTop3.push(res.news[i]);
            index++;
          }
        }
      }
    )

    getTopPopular().then(
      (res) => {
        var index = 0;
        for (var i in res.news) {
          if (index === 3) {
            break;
          }
          if (res.news[i]) {
            res.news[i].createDate = moment(res.news[i].createDate).format('DD-MM-YYYY');
            res.news[i].updateDate = moment(res.news[i].updateDate).format('DD-MM-YYYY');
            vm.listPopular.push(res.news[i]);
            index++;
          }
        }
      }
    )

    getSuggest().then(
      (res) => {
        var index = 0;
        while (index < 3) {
          i = Math.floor((Math.random() * (res.news.length - 1) + 1));
          console.log(i);
          let check = false;
          for (var j in vm.listSuggest) {
            if (vm.listSuggest[j].originalLink === res.news[i].originalLink) {
              check = true;
              break;
            }
          }
          if (check === false) {
            res.news[i].createDate = moment(res.news[i].createDate).format('DD-MM-YYYY');
            res.news[i].updateDate = moment(res.news[i].updateDate).format('DD-MM-YYYY');
            vm.listSuggest.push(res.news[i]);
            index++;
          }
        }
      }
    )
  }
})();
