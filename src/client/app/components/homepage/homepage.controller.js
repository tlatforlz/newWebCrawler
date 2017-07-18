(function () {
  angular.module('app.homepage')
    .controller('HomePageController', ['$q', '$http', '$state', HomePageController]);

  function HomePageController($q, $http, $state) {
    var vm = this;
    vm.listTop5 = [];
    vm.title = "12321321";

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


    var data = getTop5().then(
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

  }
})();
