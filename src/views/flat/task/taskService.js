(function() {
  'use strict';

  angular
    .module('flatMate')
    .service('taskService', taskService);

  taskService.$inject = [
    '$rootScope',
    '$q',
    '$state'
  ];

  function taskService($rootScope, $q, $state) {
    var task = null;
    return {
      set: function(newTask, period) {
        if (typeof newTask === 'object') {
          task = newTask;
          task.period = period;
        }
      },
      get: function() {
        return task;
      },
      thereIsTask: function() {
        return $q(function(resolve, reject){
          $state.go('home.home-tasks');
          resolve();
          return;
          if (task) {
            console.log('resolve');
            resolve();
          } else {
            console.log('reject');
            //TODO no funciona
            $state.go('home.home-tasks');
            reject();
          }
        })
      }
    }
  }

})();
