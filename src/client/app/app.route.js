(function () {
  'use strict';

  angular
    .module('app')
    .run(appRun)
    .config(authConfig);

  function authConfig($stateProvider) {
    $stateProvider
      .state('root', {
        url: '/',
      });
  }

  appRun.$inject = ['$state', '$rootScope', 'routerHelper', 'authService'];

  function appRun($state, $rootScope, routerHelper, authService) {

    var otherwise = '/404';
    routerHelper.configureStates(getStates(), otherwise);
    $rootScope.$on('$stateChangeStart', function (event, toState, fromState) {
      console.log(toState.url);
      if (toState.url === '/adminpage') {
        console.log(authService.login(null, 2));
        if (!authService.login(null, 2)) {
          event.preventDefault();
          $state.go('adminlogin');
        }
      }
    });
  }

  function getStates() {
    return [{
      state: '404',
      config: {
        url: '/404',
        templateUrl: 'app/components/404/404.html',
        title: '404'
      }
    }];
  }
})();
