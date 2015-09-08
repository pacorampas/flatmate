App.controller('singupController', function($scope, $firebaseAuth,
                                            $firebaseObject, $rootScope,
                                            $location, userFactory,
                                            authFactory) {
  var ref = new Firebase('https://flatmate.firebaseio.com');
  var Auth = $firebaseAuth(ref);

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
        $scope.acceptButton.loading = false;
        $rootScope.session = resp.data.user;
        authFactory.setToken(resp.data.token);
        $location.path('home');
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
