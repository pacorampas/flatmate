App.controller('homeController', function($scope) {
  $scope.paneActive = 0;
  $scope.changePaneTo = function(pane) {
    $scope.paneActive = pane;
  }
});
