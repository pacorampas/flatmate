(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('homeController', homeController);

  homeController.$inject = [
    '$scope',
    '$rootScope',
    '$location',
    'userFactory'
  ];

  function homeController($scope, $rootScope, $location, userFactory) {
    $scope.paneActive = 0;
    $scope.messageEmptyFlatOrTasks = '';

    messageEmptyFlatOrTasks($rootScope.session.flat);

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
      $scope.paneActive = pane;
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

    function messageEmptyFlatOrTasks(flat) {
      if (!flat) {
        $scope.messageEmptyFlatOrTasks = 'Aún no tienes creado ningún piso. Crealo e invita a tus compañeros.';
      } else if (!flat.tasks) {
        $scope.messageEmptyFlatOrTasks = 'No hay ninguna tarea registrada, comienza a crearlas y asignárselas a tus compañeros.';
      }
    }
  };

})();
