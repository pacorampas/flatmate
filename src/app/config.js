(function() {
  'use strict';

  angular
    .module('flatMate')
    .config(config);

  config.$inject = [
    '$routeProvider',
    '$httpProvider'
  ];

  function config($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');

    //TODO, use controllerAs and remove $scope of controllers
    $routeProvider.
      when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController',
        //TODO: think to controlate the authentication state with
        //$locationChangeStart event
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn(true);
          }
        }
      }).
      when('/singup', {
        templateUrl: 'views/singup.html',
        controller: 'singupController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn(true);
          }
        }
      }).
      when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      }).
      when('/new-flat', {
        templateUrl: 'views/new-flat.html',
        controller: 'newFlatController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      }).
      when('/new-task', {
        templateUrl: 'views/new-task.html',
        controller: 'newTaskController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      }).
      when('/new-spin-task', {
        templateUrl: 'views/new-spin-task.html',
        controller: 'newSpinTaskController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      }).
      otherwise({
        redirectTo: '/login'
      });
    };

})();