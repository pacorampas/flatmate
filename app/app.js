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

    /*
    $rootScope.$on('$locationChangeStart', function(event) {
      if (!onAuthReady) {
        return;
      }

      if (isAutenticated() && isPublicPath() ||
          !isAutenticated() && !isPublicPath()) {
        event.preventDefault();
      }
    });
*/
/*
    $rootScope.auth.$onAuth(function(authData) {
      onAuthReady = true;
      $rootScope.user = authData;

      if (authData) {
        usersFactory.getUserByKey(authData.uid).then(function(user) {
          if (!user) {
            return;
          };
          $rootScope.user.stored = user;
          if (user.flats) {
            flatFactory.getFlatByKey(user.flats[0]).then(function(flat) {
              $rootScope.user.flat = flat;
              $rootScope.$broadcast('flatLoaded');
            })
          }
        });
      }

      if (isAutenticated() && isPublicPath()) {
        $location.path('home');
      } else if (!isPublicPath()) {
        $location.path('login');
      }
    });
    */

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
