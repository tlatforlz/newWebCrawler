(function () {
  angular.module('app.contactpage')
    .controller('ContactPageController', ['$q', '$http', '$state', ContactPageController]);

  function ContactPageController($q, $http, $state) {
    var vm = this;
  }
})();
