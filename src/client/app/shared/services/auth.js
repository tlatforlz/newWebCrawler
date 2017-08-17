(function () {
  'use strict';

  angular.module('services.auth', ['ngStorage', 'services.errorTranslator'])
    .factory('authService', ['$q', '$http', '$localStorage', '$sessionStorage', 'jwtHelper', 'errTransService', authService]);

  function authService($q, $http, $localStorage, $sessionStorage, jwtHelper, errTransService) {
    return {
      login: login,
      logout: logout,
      storage: storage,
      getToken: getToken
    };

    var storage;

    function login(request, state) {
      var deferred = $q.defer();

      storage = $localStorage;

      console.log('herere');
      $http.post('api/auth/signin', request)
        .then(function (res) {
          storage.token = res.data.token;
          storage.user = jwtHelper.decodeToken(res.data.token);
          deferred.resolve('Login successful');
        }).catch(function (err) {
          console.log(err);
          deferred.reject(errTransService[err.data.message]);
        });

      return deferred.promise;
    }

    function logout() {
      delete $localStorage.token;
      return 'Logout successful';
    }

    function getToken() {
      if ($localStorage.token) {
        return jwtHelper.decodeToken($localStorage.token);
      }
      return false;
    }
  }
})();
