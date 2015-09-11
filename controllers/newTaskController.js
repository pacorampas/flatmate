App.controller('newTaskController', function($rootScope, $scope, $location,
                                             flatFactory) {
  $scope.newTask = {
    title: '',
    who: null,
    spin: false
  }

  $scope.acceptButton = { loading: false };

  $scope.save = function() {
    //TODO save the tasks as a firebaseArray
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
});
