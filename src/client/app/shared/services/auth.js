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
      console.log('blalalala');
      var deferred = $q.defer();
      console.log(state);
      if (state === 1) {
        storage = $localStorage;
      } else if (state === 0) {
        storage = $sessionStorage;
      } else if (state === 2) {
        if ($localStorage.token) {
          $localStorage.user = jwtHelper.decodeToken($localStorage.token);
          return true;
        } else if ($sessionStorage.token) {
          $sessionStorage.user = jwtHelper.decodeToken($sessionStorage.token);
          return true;
        }
        return false;
      }
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
      delete $sessionStorage.token;
      delete $localStorage.user;
      delete $sessionStorage.user;
      return 'Logout successful';
    }

    function getToken() {
      if ($localStorage.token) {
        return jwtHelper.decodeToken($localStorage.token);

      } else if ($sessionStorage.token) {
        return jwtHelper.decodeToken($sessionStorage.token);

      }
      return false;
    }

  }
})();
