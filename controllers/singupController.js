App.controller('singupController', function($scope, $location, userFactory) {
  $scope.email = '';
  $scope.password = '';
  $scope.passwordRepeat = '';

  $scope.acceptButton = {
    loading: false
  };

  $scope.save = function() {
    if ($scope.singupForm.$valid && $scope.password === $scope.passwordRepeat) {
      $scope.acceptButton.loading = true;

      userFactory.register({
        email: $scope.email,
        password: $scope.password
      }).then(function(resp) {
        //TODO, after register loged in the user
        //now it is happen but when you refresh the session is lost
        userFactory.login($scope.email, $scope.password).then(function(resp) {
          $scope.acceptButton.loading = false;
          $location.path('home');
        });
      }).catch(function(err) {
        console.log(err);
        $scope.acceptButton.loading = false;
      });
    }
  }

  $scope.back = function() {
    $location.path('login');
  }
});
