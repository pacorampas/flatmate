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

})();
