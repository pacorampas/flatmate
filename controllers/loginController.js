App.controller('loginController', function($rootScope, $scope, $location,
                                           $firebaseAuth, userFactory,
                                           authFactory) {
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
      authFactory.setToken(resp.data.token);
      $rootScope.session = resp.data.user;
      console.log(resp.data);
      $location.path('home');
    }).catch(function(err) {
      alert('Bad credentials.');
      $scope.acceptButton.loading = false;
      console.log(err);
    });
  }
});
