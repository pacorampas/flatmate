App.controller('newTaskController', function($rootScope, $scope, $location) {
  $scope.newTask = {
    title: '',
    who: -1,
    spin: false
  }

  $scope.acceptButton = { loading: false };

  if (!$rootScope.user.flat) {
    $rootScope.$on('flatLoaded', function(event, mass) {
      $scope.mates = $rootScope.user.flat.mates;
    })
  } else {
    $scope.mates = $rootScope.user.flat.mates;
  }

  $scope.save = function() {
    //TODO save the tasks as a firebaseArray
    if (!$scope.newTaskForm.$valid) {
      return;
    }
    $scope.acceptButton.loading = true;
    $rootScope.user.flat.tasks = $rootScope.user.flat.tasks || [];
    $rootScope.user.flat.tasks.push($scope.newTask);
    $rootScope.user.flat.$save().then(function() {
      console.log('saved task');
      $scope.acceptButton.loading = false;
      $location.path('home');
    })
  }

  $scope.back = function() {
    $location.path('home');
  }
});
