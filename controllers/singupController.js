App.controller('singupController', function($scope, $firebaseAuth, $firebaseObject) {
  var ref = new Firebase('https://flatmate.firebaseio.com');
  var Auth = $firebaseAuth(ref);

  $scope.email = '';
  $scope.regexEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
  $scope.password = '';
  $scope.passwordRepeat = '';

  //TODO best way to validate until the user acctept/save the form
  //see also login
  $scope.validate = false;

  $scope.save = function() {
    $scope.validate = true;
    if ($scope.singupForm.email.$valid && $scope.singupForm.password.$valid &&
        $scope.password === $scope.passwordRepeat) {
      Auth.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        alert("User created with uid: " + userData.uid);
        
        var userDB = $firebaseObject(ref.child('users').child(userData.uid));
        userDB.$value = {
          email: $scope.email,
        };

        userDB.$save().then(function() {
          alert('User saved!');
        }).catch(function(error) {
          alert('Error!');
        });

      }).catch(function(error) {
        //TODO show a error if the email is taken
        if (error) {
          switch (error.code) {
            case "INVALID_EMAIL":
              console.log("The specified user account email is invalid.");
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
});
