(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('newSpinTaskController', newSpinTaskController);

  newSpinTaskController.$inject = [
    '$rootScope',
    '$scope',
    '$location',
    'flatFactory'
  ];

  function newSpinTaskController($rootScope, $scope, $location, flatFactory) {
    $scope.newTask = {
      title: '',
      spin: true,
      period: null,
      subtasks: [
        { value: 'hi' }
      ]
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
        $location.path('home');
      }).catch(function(err) {
        console.log(err);
      });
    }

    $scope.addNewSubtask = function(event) {
      event.preventDefault();
      $scope.newTask.subtasks.push({value: ''});
    }

    $scope.back = function() {
      $location.path('home');
    }
  };

})();
