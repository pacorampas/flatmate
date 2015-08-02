App.controller('homeController', function($scope, $rootScope) {
  $scope.paneActive = 0;

  if (!$rootScope.user.flat) {
    $rootScope.$on('flatLoaded', function(event, mass) {
      $scope.flat = $rootScope.user.flat;
    })
  } else {
    $scope.mates = $rootScope.user.flat.mates;
  }


  $scope.simpleTask = function(event) {
    event.stopPropagation();
    alert('simpleTask');
  };
  $scope.spinTask = function() {
    event.stopPropagation();
    alert('spin task');
  };
  

  $scope.changePaneTo = function(pane) {
    $scope.paneActive = pane;
  }
});
