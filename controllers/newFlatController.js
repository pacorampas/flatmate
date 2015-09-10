App.controller('newFlatController', function($rootScope, $scope, flatFactory,
                                              usersFactory, $location,
                                              flatNewFactory, userFactory) {
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
       userFactory.addOwnerAsMate();
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
});
