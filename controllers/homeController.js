App.controller('homeController', function($scope, $rootScope, $location) {
  $scope.paneActive = 0;
  $scope.messageEmptyFlatOrTasks = '';

  messageEmptyFlatOrTasks($rootScope.user.flat);

  if (!$rootScope.user.flat) {
    $rootScope.$on('flatLoaded', function(event, mass) {
      $scope.flat = $rootScope.user.flat;
    })
  } else {
    $scope.mates = $rootScope.user.flat.mates;
  }

  $rootScope.$watch('user.flat', function(newVal, oldVal) {
    if (!$rootScope.user && !$rootScope.user.flat) {
      return;
    }
    messageEmptyFlatOrTasks($rootScope.user.flat);
  })

  $scope.simpleTask = function(event) {
    event.stopPropagation();
    $location.path('/new-task');
  };

  $scope.spinTask = function() {
    event.stopPropagation();
    alert('La tarea rotatoria no está implementada.');
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
    var userEmail = $rootScope.user.password.email;

    if (!flat) {
      $scope.messageEmptyFlatOrTasks = 'Aún no tienes creado ningún piso. Crealo e invita a tus compañeros.';
    } else if (!flat.tasks) {
      $scope.messageEmptyFlatOrTasks = 'No hay ninguna tarea registrada, comienza a crearlas y asignárselas a tus compañeros.';
    }
  }
});
