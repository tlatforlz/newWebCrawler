(function () {
  angular.module('app.homepage')
    .controller('HomePageController', ['$q', '$http', '$state', HomePageController]);

  function HomePageController($q, $http, $state) {
    var vm = this;
    vm.listTop5 = [];
    vm.listTop3 = [];
    vm.listPopular = [];
    vm.listSuggest = [];
    vm.listTinTuc = [];
    vm.listNongNghiep = [];
    vm.listChuyenNhaNong = [];
    vm.listChanNuoi = [];

    function getTop5() {
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

    function getTinTuc() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/getNews/getNewsArchive/tin-tuc'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function getChanNuoi() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/getNews/getNewsArchive/chan-nuoi'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function getNongNghiep() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'api/news/getNews/getNewsArchive/nong-nghiep'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    function getChuyenNhaNong() {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/news/getNews/getNewsArchive/chuyen-nha-nong'
      }).then(function successCallback(res) {
        deferred.resolve(res.data);
      }, function () {
        deferred.reject(null);
      });
      return deferred.promise;
    }

    getTinTuc().then(
      (res) => {
        var index = 0;
        for (var i in res.news) {
          if (index === 5) {
            break;
          }
          if (res.news[i]) {
            res.news[i].createDate = moment(res.news[i].createDate).format('DD-MM-YYYY');
            res.news[i].updateDate = moment(res.news[i].updateDate).format('DD-MM-YYYY');
            vm.listTinTuc.push(res.news[i]);
            index++;
          }
        }
      }
    )

    getNongNghiep().then(
      (res) => {
        var index = 0;
        for (var i in res.news) {
          if (index === 5) {
            break;
          }
          if (res.news[i]) {
            res.news[i].createDate = moment(res.news[i].createDate).format('DD-MM-YYYY');
            res.news[i].updateDate = moment(res.news[i].updateDate).format('DD-MM-YYYY');
            vm.listNongNghiep.push(res.news[i]);
            index++;
          }
        }
      }
    )

    getChanNuoi().then(
      (res) => {
        var index = 0;
        for (var i in res.news) {
          if (index === 5) {
            break;
          }
          if (res.news[i]) {
            res.news[i].createDate = moment(res.news[i].createDate).format('DD-MM-YYYY');
            res.news[i].updateDate = moment(res.news[i].updateDate).format('DD-MM-YYYY');
            vm.listChanNuoi.push(res.news[i]);
            index++;
          }
        }
      }
    )

    getChuyenNhaNong().then(
      (res) => {
        var index = 0;
        for (var i in res.news) {
          if (index === 5) {
            break;
          }
          if (res.news[i]) {
            res.news[i].createDate = moment(res.news[i].createDate).format('DD-MM-YYYY');
            res.news[i].updateDate = moment(res.news[i].updateDate).format('DD-MM-YYYY');
            vm.listChuyenNhaNong.push(res.news[i]);
            index++;
          }
        }
      }
    )


    getTop5().then(
      (res) => {
        var index = 0;
        for (var i in res.news) {
          if (index === 5) {
            break;
          }
          if (res.news[i]) {
            res.news[i].createDate = moment(res.news[i].createDate).format('DD-MM-YYYY');
            res.news[i].updateDate = moment(res.news[i].updateDate).format('DD-MM-YYYY');
            vm.listTop5.push(res.news[i]);
            index++;
          }
        }
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
