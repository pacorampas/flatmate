App.controller('newTaskController', function($scope, taskFactory, $firebaseAuth) {
  $scope.tasks = taskFactory.getAll();
  $scope.newTask = taskFactory.getNewTask();
  
  $scope.save = function() {
    taskFactory.save($scope.newTask);
    $scope.newTask = taskFactory.getNewTask();
  }

  $scope.remove = function(task) {
    taskFactory.remove(task);
  }
});
