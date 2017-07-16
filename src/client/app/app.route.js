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

  appRun.$inject = ['$state', '$rootScope', 'routerHelper'];

  function appRun($state, $rootScope, routerHelper) {

    var otherwise = '/404';

    routerHelper.configureStates(getStates(), otherwise);

    $rootScope.$on('$stateChangeStart', function (event, toState, fromState) {
      if (toState.url === '/') {
        event.preventDefault();
        $state.go('app.homepage');
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
