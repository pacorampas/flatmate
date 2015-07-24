var App = angular.module('flatMate', ['firebase', 'ngRoute']);


App.run(function($rootScope, $location, $firebaseAuth) {
  var ref = new Firebase("https://flatmate.firebaseio.com");
  $rootScope.auth = $firebaseAuth(ref);

  $rootScope.$on('$locationChangeStart', function(event) {
    isAutenticated();
  });

  $rootScope.auth.$onAuth(function(authData) {
    $rootScope.user = authData;
    isAutenticated();
  });

  function isAutenticated() {
    if (!$rootScope.user) {
      $location.path('login');
      return;
    }
    $location.path('new-task');
  }
});
