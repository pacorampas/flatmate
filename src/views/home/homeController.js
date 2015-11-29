(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('homeController', homeController);

  homeController.$inject = [
    '$scope',
    '$rootScope',
    '$location',
    'userFactory',
    'flatFactory'
  ];

  function homeController($scope, $rootScope, $location, userFactory,
                                                                  flatFactory) {
    $scope.panes = {
      myTasksActive: true,
      tasksActive: false
    }

    $scope.logout = function() {
      userFactory.logout();
      $location.path('login');
    }

    $scope.simpleTask = function(event) {
      event.stopPropagation();
      $location.path('/new-task');
    };

    $scope.spinTask = function() {
      event.stopPropagation();
      $location.path('/new-spin-task');
    };

    $scope.changePaneTo = function(pane) {
      console.log(pane);
      if (pane === 0 && !$scope.panes.myTasksActive) {
        $scope.panes.myTasksActive = true;
        $scope.panes.tasksActive = false;
      } else if (pane === 1 && !$scope.panes.tasksActive) {
        $scope.panes.myTasksActive = false;
        $scope.panes.tasksActive = true;
      }
    }

    $scope.newFlatButton = function() {
      $location.path('new-flat')
    }

    $scope.endTask = function(task, index) {
      $rootScope.user.flat.tasks.splice(index, 1);
      $rootScope.user.flat.$save().then(function(){
        console.log('Task removed');
      });
    }

    $scope.markTaskAsDone = function(task) {
      flatFactory.markTaskAsDone($rootScope.session.flat, task);
    }

    $scope.messageEmptyFlatOrTasks = function() {
      var flat = $rootScope.session.flat;
      if (!flat) {
        return 'Aún no tienes creado ningún piso. Crealo e invita a tus compañeros.';
      } else if (!flat.tasks.length) {
        return 'No hay ninguna tarea registrada, comienza a crearlas y asignárselas a tus compañeros.';
      }
      return false;
    }
  };

})();
