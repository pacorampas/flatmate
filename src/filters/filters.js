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
        return filtersFactory.spinTaskForMe(task.history);
      }
      return filtersFactory.itIsMe(task.who);
    };
  };

  angular
    .module('flatMate')
    .filter('spinTaskForMe', spinTaskForMe);

  spinTaskForMe.$inject = [
    'filtersFactory'
  ];

  function spinTaskForMe(filtersFactory) {
    return function(history) {
      return filtersFactory.spinTaskForMe(history).subtask.value;
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
      for(var i = 0, l = tasks.length; i < l; i++) {
        if (tasks[i].spin && filtersFactory.spinTaskForMe(tasks[i].history)) {
          return false;
        } else if (filtersFactory.itIsMe(tasks[i].who)) {
          return false;
        }
      }
      return true;
    }
  };

  angular
    .module('flatMate')
    .filter('taskIsDone', taskIsDone);

  taskIsDone.$inject = [
    'filtersFactory'
  ];

  function taskIsDone(filtersFactory) {
    return function(task) {
      if (!task.spin) {
        return task.done;
      } else {
        var subtaskForMe = filtersFactory.spinTaskForMe(task.history);
        return subtaskForMe.done;
      }
    };
  };

  angular
    .module('flatMate')
    .filter('spinTaskAllDone', spinTaskAllDone);

  function spinTaskAllDone() {
    return function(spinTask) {
      if (!spinTask.spin) {
        return false;
      }

      var subtasks = spinTask.history[spinTask.history.length - 1].subtasks;
      for(var i = 0, l = subtasks.length; i < l; i++) {
        if (!subtasks[i].done) {
          return true;
        }
      }

      return false;
    };
  };

  angular
    .module('flatMate')
    .filter('matchTaskWithMate', matchTaskWithMate);

  matchTaskWithMate.$inject = [
    '$rootScope'
  ];

  function matchTaskWithMate($rootScope) {
    return function(task, idPeriod) {
      var periods = $rootScope.session.flat.periods;
      var mates = $rootScope.session.flat.mates;

      var period = null;
      for(var i = 0, l = periods.length; i < l; i++) {
        if (periods[i]._id === idPeriod) {
          period = periods[i];
          break;
        }
      }

      var distributionItem = null;
      if (period) {
        var distribution = period.history[period.history.length-1].distribution;
        for(var i = 0, l = distribution.length; i < l; i++) {
          if (distribution[i].task === task._id) {
            distributionItem = distribution[i];
            break;
          }
        }
      }

      if (distributionItem) {
        for(var i = 0, l = mates.length; i < l; i++) {
          if (mates[i]._id === distributionItem.who) {
            return mates[i];
          }
        }
      }

      return;
    };
  };

  angular
    .module('flatMate')
    .filter('whichPeriodIs', whichPeriodIs);

  function whichPeriodIs() {
    return function(periodCode) {
      if (periodCode === 1) {
        return 'SEMANALES';
      } else if (periodCode === 0) {
        return 'DIARIAS';
      } else if (periodCode === 2) {
        return 'MENSUALES';
      } else if (periodCode === 3) {
        return 'ANUALES';
      }
    };
  };

})();
