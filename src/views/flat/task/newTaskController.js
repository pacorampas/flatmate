(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('newTaskController', newTaskController);

  newTaskController.$inject = [
    '$controller',
    '$rootScope',
    '$scope'
  ];

  function newTaskController($controller, $rootScope, $scope) {
    $controller('taskController', {
      $scope: $scope
    });

    $scope.save = function() {
      if (!$scope.newTaskForm.$valid) {
        return;
      }
      $scope.acceptButton.loading = true;

      //TODO catch errors with dialog
      $scope.flatFactory.addTask($rootScope.session.flat._id, $scope.newTask)
          .then(function(resp) {

        $scope.acceptButton.loading = false;
        $scope.$location.path('home/home-tasks');
      }).catch(function(err) {
        console.log(err);
      });
    }

  }

})();
