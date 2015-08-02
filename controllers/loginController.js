App.controller('loginController', function($rootScope, $scope, $firebaseAuth) {
  $scope.email = '';
  $scope.password = '';

  $scope.acceptButton = {
    loading: false
  };

  $scope.login = function() {
    if (!$scope.loginForm.$valid) {
      return;
    }

    $scope.acceptButton.loading = $scope.loginForm.$valid;

    //TODO factory for login, it is repeat here and in singup
    $rootScope.auth.$authWithPassword({
      email: $scope.email, //'fulanito@gmail.com',
      password: $scope.password //'123456'
    }).then(function(authData) {
      $scope.acceptButton.loading = false;
    }).catch(function(error) {
      $scope.acceptButton.loading = false;
      //TODO show a error with invalid password + emial
      alert('Bad credentials.');
      console.log(error.code);
      console.error("Authentication failed:", error);
    });
  }
});
