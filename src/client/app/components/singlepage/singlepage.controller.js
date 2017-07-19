(function () {
  angular.module('app.singlepage')
    .controller('SinglePageController', ['$q', '$http', '$state', SinglePageController]);

  function SinglePageController($q, $http, $state) {
    var vm = this;
    vm.listTop5 = [];

    function getData() {
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


    var data = getData().then(
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
