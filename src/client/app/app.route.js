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
      if (toState.url === '') {
        event.preventDefault();
        $state.go('homepage');
      }
      if (toState.url === 'singlepage/:id') {
        event.preventDefault();
        $state.go('singlepage');
      }
      console.log(toState.url);
      if (toState.url === 'contact') {
        event.preventDefault();
        $state.go('contactpage');
      }
      if (toState.url === 'about') {
        event.preventDefault();
        $state.go('about');
      }
      if (toState.url === 'category') {
        event.preventDefault();
        $state.go('category');
      }
      if (toState.url === 'search') {
        event.preventDefault();
        $state.go('search');
      }
      if (toState.url === 'adminlogin') {
        event.preventDefault();
        $state.go('adminlogin');
      }
      if (toState.url === 'adminpage') {
        event.preventDefault();
        $state.go('adminpage');
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
