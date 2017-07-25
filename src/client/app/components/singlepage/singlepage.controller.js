(function () {
  angular.module('app.singlepage')
    .controller('SinglePageController', ['$q', '$http', '$state', '$scope', '$stateParams', SinglePageController]);

  function SinglePageController($q, $http, $state, $scope, $stateParams) {
    var vm = this;
    vm.news = null;
    vm.listTop3 = [];
    vm.listPopular = [];
    vm.listSuggest = [];

    function getNewsDetails() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/news/' + $stateParams.id
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

    getNewsDetails().then(
      (res) => {
        vm.news = res.news;
        vm.news.createDate = moment(res.news.createDate).format('DD-MM-YYYY');
      }
    )

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
