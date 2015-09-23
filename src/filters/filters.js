(function() {
  'use strict';

  angular
    .module('flatMate')
    .filter('isMyTask', isMyTask);

  isMyTask.$inject = [
    'filtersFactory'
  ];

  function isMyTask(filtersFactory) {
    return function(task) {
      if (task.spin) {
        return filtersFactory.spinTaskTaskForMe(task.history);
      }
      return filtersFactory.itIsMe(task.who);
    };
  };

  angular
    .module('flatMate')
    .filter('spinTaskTaskForMe', spinTaskTaskForMe);

  spinTaskTaskForMe.$inject = [
    'filtersFactory'
  ];

  function spinTaskTaskForMe(filtersFactory) {
    return function(history) {
      return filtersFactory.spinTaskTaskForMe(history);
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
      var me = filtersFactory.itIsMe(input);
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
    return function(tasks){
      if (!tasks || typeof tasks === "undefined") {
        return true;
      }
      for(var i=0, l = tasks.length; i < l; i++) {
        if (filtersFactory.itIsMe(tasks[i].who)) {
          return false;
        }
      }
      return true;
    }

  };

})();
