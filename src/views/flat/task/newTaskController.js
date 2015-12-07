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
      period: null,
      tasks: []
    }

    $scope.periodOptions = [
      'Diario',
      'Semanal',
      'Mensual',
      'Anual'
    ];

    $scope.acceptButton = { loading: false };

    $scope.save = function() {
      if (!$scope.newTaskForm.$valid) {
        return;
      }
      $scope.acceptButton.loading = true;

      //TODO catch errors
      flatFactory.addSpinTask($rootScope.session.flat._id, $scope.newTask)
                                                          .then(function(resp) {
        $scope.acceptButton.loading = false;
        $location.path('home/home-tasks');
      }).catch(function(err) {
        console.log(err);
      });
    }

    $scope.back = function() {
      $location.path('home');
    }
  }

})();
