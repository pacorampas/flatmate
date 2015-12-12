(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('taskController', taskController);

  taskController.$inject = [
    '$scope',
    '$location',
    'flatFactory'
  ];

  function taskController($scope, $location, flatFactory) {
    $scope.$location = $location;
    $scope.flatFactory = flatFactory;

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

    $scope.back = function() {
      $location.path('home/home-tasks');
    }
  }

})();
