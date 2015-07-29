App.controller('newFlatController', function($rootScope, $scope, flatFactory, usersFactory) {
  $scope.flat = flatFactory.getNewFlat();

  $scope.acceptButton = {
    loading: false
  };

  $scope.createFlat = function() {
    if (!$scope.newFlatForm.$valid) {
      return;
    }

    $scope.acceptButton.loading = true;

    $scope.flat.owner = $rootScope.user.password.email;

    //replace all spaces for nothing
    //and make an array
    var mates = $scope.flat.mates.replace(/ /g,'');
    mates = mates.split(',');
    $scope.flat.mates = mates;

    flatFactory.save($scope.flat).then(function(ref) {
      $scope.acceptButton.loading = false;
      var idFlat = ref.key();
      console.log("Added flat with id " + idFlat);

      //save the flat into the owner flats
      usersFactory.getUserByKey($rootScope.user.uid).then(function(user) {
        user.flats = user.flats ? user.flats : [];
        user.flats.push(idFlat);
        user.$save().then(function(){
          console.log('User owner save the flat');
        });
      });

      //After save we check if the invities are singup into the app
      //If the user is sing up we asing to the user the flat
      //else we save the email into a limbo for asigning the flat in the future
      for (var i = 0, l = mates.length; i < l; i++) {
        var mate = mates[i];
        usersFactory.getUserByEmail(mate).then(function(user) {
          if (user[0]) {
            user[0].flats = user[0].flats ? user[0].flats : [];
            user[0].flats.push(idFlat);
            user.$save(user[0]).then(function() {
              console.log('save flat\'s user');
            });
          } else {
            usersFactory.setUserIntoLimbo(mate, idFlat, function() {
              console.log('update flat\'s user');
            });
          }
        }).catch(function(error) {
          $scope.acceptButton.loading = false;
          console.error("Error:", error);
          onsole.log(error.code);
        });
      }
    }).catch(function(error) {
      $scope.acceptButton.loading = false;
      console.error("Error:", error);
      console.log(error.code);
    });
  }
});
