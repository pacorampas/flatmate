App.filter('itIsMe', function($rootScope, filtersFactory) {
  return function(input, mates) {
    return filtersFactory.itIsMe(input, mates);
  };
});

App.filter('whoIs', function($rootScope, filtersFactory) {
  return function(input, mates) {
    if (input == -1) {
      return 'Todos';
    }
    var me = filtersFactory.itIsMe(input, mates);
    if (me) {
      return 'Pringas';
    }
    var mateEmail = null;
    mates.forEach(function(mate) {
      if (mate._id === input) {
        mateEmail = mate.email;
        return;
      }
    });
    return mateEmail;
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
