App.filter('itIsMe', function($rootScope) {
  return function(input, mates) {
    if (input == -1) {
      return true;
    }
    var me = $rootScope.user.password.email;
    return mates[input] === me ? true : false;
  };
});

App.filter('whoIs', function($rootScope) {
  return function(input, mates) {
    if (input == -1) {
      return 'Todos';
    }
    var me = $rootScope.user.password.email;
    return mates[input] === me ? 'Pringas' : mates[input];
  };
});
