App.controller('loginController', function($scope, $firebaseAuth) {
  var ref = new Firebase("https://flatmate.firebaseio.com");
  var Auth = $firebaseAuth(ref);

  $scope.email = '';
  $scope.password = '';
  $scope.EMAIL_REGEXP = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

  $scope.acceptButton = {
    loading: false
  };

  $scope.login = function() {
    if (!$scope.loginForm.$valid) {
      return;
    }

    $scope.acceptButton.loading = $scope.loginForm.$valid;

    Auth.$authWithPassword({
      email: $scope.email, //'fulanito@gmail.com',
      password: $scope.password //'123456'
    }).then(function(authData) {
      $scope.acceptButton.loading = false;
      console.log("Logged in as:", authData.uid);
      $scope.user = authData;
    }).catch(function(error) {
      $scope.acceptButton.loading = false;
      //TODO show a error with invalid password + emial
      alert('Bad credentials.');
      console.log(error.code);
      console.error("Authentication failed:", error);
      console.log(error);
    });
  }
});
