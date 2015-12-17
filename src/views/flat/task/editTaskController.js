(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('editTaskController', editTaskController);

  editTaskController.$inject = [
    '$controller',
    '$rootScope',
    '$scope',
    'taskService'
  ];

  function editTaskController($controller, $rootScope, $scope, taskService) {
    $controller('taskController', {
      $scope: $scope
    });

    activate();

    $scope.save = function() {
      if (!$scope.newTaskForm.$valid) {
        return;
      }

      $scope.acceptButton.loading = true;
      //TODO catch errors
      $scope.flatFactory.updateTask($rootScope.session.flat._id,
          $scope.newTask.oldPeriodId, $scope.newTask).then(function(resp) {

        $scope.acceptButton.loading = false;
        $scope.$location.path('home/home-tasks');
      }).catch(function(err) {
        console.log(err);
      });
    }

    function activate() {
      var task = taskService.get();

      $scope.newTask = {
        period: task.period.period,
        oldPeriodId: task.periods[task.periods.length-1],
        tasks: [task.value],
        id: task._id
      }
    }
  }

})();
