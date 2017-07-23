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
      console.log('state to homepage');
      if (toState.url === '') {
        event.preventDefault();
        $state.go('homepage');
      } else {
        if (toState.url === 'singlepage/:id') {
          event.preventDefault();
          $state.go('singlepage');
        } else {
          console.log('call here');
          console.log(toState.url);
          if (toState.url === 'contact') {
            console.log('call contact');
            event.preventDefault();
            $state.go('contactpage');
          } else {
            if (toState.url === 'about') {
              event.preventDefault();
              $state.go('about');
            }
          }
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
