var App = angular.module('flatMate',
  [
    'firebase',
    'ngRoute',
    'ngAnimate'
  ]
);

window.onload = function() {
  angular.bootstrap(document.body, ['flatMate']);
}

App.run(function($rootScope, $location, $firebaseAuth, usersFactory, flatFactory) {
  initAuth();

  //TODO, make a factory
  function initAuth() {
    //it is to prevent that event $locationChangeStart start before of onOauth.
    //Because we won't be able to go to a private path at first time.
    var onAuthReady = false;

    var ref = new Firebase("https://flatmate.firebaseio.com");
    $rootScope.auth = $firebaseAuth(ref);

    function isAutenticated() {
      return $rootScope.user ? true : false;
    }

    function isPublicPath() {
      var path = $location.path();
      if (path.search('login') >= 0 || path.search('singup') >= 0) {
        return true;
      } else {
        return false;
      }
    }
  }
});
