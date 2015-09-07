App.config(['$routeProvider', '$httpProvider',  function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');

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
    when('/new-flat', {
      templateUrl: 'views/new-flat.html',
      controller: 'newFlatController'
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
