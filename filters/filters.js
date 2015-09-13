(function() {
  'use strict';

  angular
    .module('flatMate')
    .filter('itIsMe', itIsMe);

  itIsMe.$inject = [
    'filtersFactory'
  ];

  function itIsMe(filtersFactory) {
    return function(input, mates) {
      return filtersFactory.itIsMe(input, mates);
    };
  };

  angular
    .module('flatMate')
    .filter('whoIs', whoIs);

  whoIs.$inject = [
    'filtersFactory'
  ];

  function whoIs(filtersFactory) {
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
  };

  angular
    .module('flatMate')
    .filter('noTasksForMe', noTasksForMe);

  noTasksForMe.$inject = [
    'filtersFactory'
  ];

  function noTasksForMe(filtersFactory) {
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

  };

})();
