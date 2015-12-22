(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('taskController', taskController);

  taskController.$inject = [
    '$controller',
    '$scope',
    '$location',
    'flatFactory'
  ];

  function taskController($controller, $scope, $location) {
    $controller('newBaseController', {
      $scope: $scope
    });

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
  }

})();
