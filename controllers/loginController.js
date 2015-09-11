App.controller('loginController', function($scope, $location, userFactory) {
  $scope.email = '';
  $scope.password = '';

  $scope.acceptButton = {
    loading: false
  };

  $scope.login = function() {
    if (!$scope.loginForm.$valid) {
      return;
    }
    $scope.acceptButton.loading = true;

    userFactory.login($scope.email, $scope.password).then(function(resp) {
      $scope.acceptButton.loading = false;
      $location.path('home');
    }).catch(function(err) {
      alert('Bad credentials.');
      $scope.acceptButton.loading = false;
      console.log(err);
    });
  }
});
