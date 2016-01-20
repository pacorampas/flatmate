(function() {
  'use strict';

  angular
    .module('flatMate')
    .config(config);

  config.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider'
  ];

  function config($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpRequestInterceptor');

    $urlRouterProvider.otherwise('/login');

    //TODO, use controllerAs and remove $scope of controllers
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller: 'loginController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn(true);
          }
        }
      })
      .state('singup', {
        url: '/singup',
        templateUrl: 'views/singup/singup.html',
        controller: 'singupController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn(true);
          }
        }
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home/home.html',
        controller: 'homeController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      })
      .state('home.basket', {
        url: '/basket',
        templateUrl: 'views/home/basket/basket.html',
        controller: 'basketController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      })
      .state('home.home-tasks', {
        url: '/home-tasks',
        templateUrl: 'views/home/tasks/home-tasks.html',
        controller: 'homeTasksController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      })
      .state('home.menu', {
        url: '/menu',
        templateUrl: 'views/home/menu/menu.html',
        controller: 'menuController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      })
      .state('new-flat', {
        url: '/new-flat',
        templateUrl: 'views/flat/new-flat.html',
        controller: 'flatController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      })
      .state('edit-flat', {
        url: '/edit-flat',
        templateUrl: 'views/flat/edit-flat.html',
        controller: 'flatController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      })
      .state('new-task', {
        url: '/new-task',
        templateUrl: 'views/flat/task/new-task.html',
        controller: 'newTaskController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      })
      .state('new-basket-item', {
        url: '/new-basket-item',
        templateUrl: 'views/flat/basket/new-basket-item.html',
        controller: 'newBasketItemController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      })
      .state('edit-basket-item', {
        url: '/edit-basket-item/:basketItemId',
        templateUrl: 'views/flat/basket/edit-basket-item.html',
        controller: 'editBasketItemController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      })
      .state('home.home-tasks.edit-task', {
        url: '/edit-task/:taskId',
        templateUrl: 'views/flat/task/edit-task.html',
        controller: 'editTaskController',
        resolve: {
          isloggedIn: function($rootScope, userFactory) {
            return userFactory.isLoggedIn();
          }
        }
      })
  }

})();
