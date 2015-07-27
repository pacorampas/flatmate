App.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
      }).
      when('/singup', {
        templateUrl: 'views/singup.html',
        controller: 'singupController'
      }).
      when('/home', {
        templateUrl: 'views/home.html',
        controller: 'homeController'
      }).
      when('/new-task', {
        templateUrl: 'views/new-task.html',
        controller: 'newTaskController'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]
);