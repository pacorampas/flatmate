App.controller('newFlatController', function($rootScope, $scope, flatFactory,
                                              usersFactory, $location,
                                              flatNewFactory) {
  $scope.flat =  {
    name: '',
    mates: []
  };

  $scope.acceptButton = {
    loading: false
  };

  $scope.createFlat = function() {
    if (!$scope.newFlatForm.$valid) {
      return;
    }
    $scope.acceptButton.loading = true;

    //replace all spaces for nothing
    //and make an array
    var mates = $scope.flat.mates.replace(/ /g,'');
    mates = mates.split(',');
    $scope.flat.mates = mates;

    flatNewFactory.add($scope.flat).then(function(resp) {
      //TODO mirar en resp.data.mates que mates no se han creado porque
      //no tienen usuario registrado
      console.log(resp);
      $rootScope.session.flat = resp.data;
      $location.path('home');
      $scope.acceptButton.loading = false;
    }).catch(function(err) {
      console.log(err);
      $scope.acceptButton.loading = false;
    });
  }

  $scope.back = function() {
    $location.path('home');
  }

  function asingFlatToUser(mate, idFlat) {
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
});
