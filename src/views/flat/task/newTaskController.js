(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('newTaskController', newTaskController);

  newTaskController.$inject = [
    '$rootScope',
    '$scope',
    '$location',
    'flatFactory'
  ];

  function newTaskController($rootScope, $scope, $location, flatFactory) {
    $scope.newTask = {
      title: '',
      who: null,
      spin: false
    }

    $scope.acceptButton = { loading: false };

    $scope.save = function() {
      if (!$scope.newTaskForm.$valid) {
        return;
      }
      $scope.acceptButton.loading = true;
      //TODO catch errors
      flatFactory.addTask($rootScope.session.flat._id, $scope.newTask)
                                                            .then(function(resp) {
        $scope.acceptButton.loading = false;
        $location.path('home');
      });
    }

    $scope.back = function() {
      $location.path('home');
    }
  };

})();
