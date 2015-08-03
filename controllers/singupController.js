App.controller('singupController', function($scope, $firebaseAuth,
                                            $firebaseObject, $rootScope,
                                            $location, usersFactory) {
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
      Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        console.log("User created with uid: " + userData.uid);
        usersFactory.getUserLimboByEmail($scope.email)
            .then(function(userLimbo) {
          //TODO put this into the users factory
          var userDB = $firebaseObject(ref.child('users').child(userData.uid));
          userDB.$value = {
            email: $scope.email,
          };

          if (userLimbo[0]) {
            userDB.$value.flats = userLimbo[0].flats[0];
          }

          userDB.$save().then(function() {
            console.log('User saved!');

            //TODO factory for login, it is repeat here and in login
            $rootScope.auth.$authWithPassword({
              email: $scope.email,
              password: $scope.password
            }).then(function(authData) {
              userLimbo.$remove(userLimbo[0]);
              $scope.acceptButton.loading = false;
            }).catch(function(error) {
              $scope.acceptButton.loading = false;
              //TODO show a error with invalid password + email
              alert('Bad credentials.');
              console.log(error.code);
              console.error("Authentication failed:", error);
            });
          }).catch(function(error) {
            alert('Error!');
            $scope.acceptButton.loading = false;
          });
        });

      }).catch(function(error) {
        $scope.acceptButton.loading = false;
        //TODO show a error if the email is taken
        if (error) {
          switch (error.code) {
            case "INVALID_EMAIL":
              alert("Este email ya está en uso.");
              break;
            case "INVALID_PASSWORD":
              console.log("The specified user account password is incorrect.");
              break;
            case "INVALID_USER":
              console.log("The specified user account does not exist.");
              break;
            default:
              console.log("Error logging user in:", error);
          }
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }
  }

  $scope.back = function() {
    $location.path('login');
  }
});
