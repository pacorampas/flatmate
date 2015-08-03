App.filter('itIsMe', function($rootScope, filtersFactory) {
  return function(input, mates) {
    return filtersFactory.itIsMe(input, mates);
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

App.filter('noTasksForMe', function($rootScope, filtersFactory) {
  return function(tasks, mates){
    if (!tasks || typeof tasks === "undefined") {
      return true;
    }
    for(var i=0, l = tasks.length; i < l; i++) {
      if (filtersFactory.itIsMe(tasks[i].who, mates)) {
        return false;
      }
    }
    return true;
  }

});
