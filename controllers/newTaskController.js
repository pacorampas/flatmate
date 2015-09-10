App.controller('newTaskController', function($rootScope, $scope, $location,
                                             flatNewFactory) {
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
    flatNewFactory.addTask($rootScope.session.flat._id, $scope.newTask)
                                                          .then(function(resp) {
      $scope.acceptButton.loading = false;
      $location.path('home');
    });
  }

  $scope.back = function() {
    $location.path('home');
  }
});
