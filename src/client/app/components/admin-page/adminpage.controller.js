(function () {
  angular.module('app.adminpage')
    .controller('AdminPageController', ['$q', '$http', '$state', '$stateParams', '$scope', AdminPageController]);

  function AdminPageController($q, $http, $state, $stateParams, $scope) {
    var vm = this;

    function NewsCrawler() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/countNews'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }
    NewsCrawler().then(function (res) {
      console.log(res);
      vm.newscrawler = res.count;
    })

    function NewsActive() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/countNewsActive'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }
    NewsActive().then(function (res) {
      console.log(res);
      vm.newsactive = res.count;
    })

    function Spiders() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/spider/countSpider'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }
    Spiders().then(function (res) {
      console.log(res);
      vm.spiders = res.spider;
    })

    function Views() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/totalView'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }
    Views().then(function (res) {
      console.log(res);
      vm.views = res.count[0].total;
    })
  }
})();
