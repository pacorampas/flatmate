(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('homeTasksController', homeTasksController);

  homeTasksController.$inject = [
    '$scope',
    '$state',
    'taskService'
  ];

  function homeTasksController($scope, $state, taskService) {
    $scope.goToEditTask = function (taskToEdit, periodOfTask) {
      taskService.set(taskToEdit, periodOfTask);
      $state.go('home.home-tasks.edit-task', { taskId: taskToEdit._id });
    }
  };

})();
