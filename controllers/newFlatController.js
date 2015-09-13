(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('newFlatController', newFlatController);

  newFlatController.$inject = [
    '$scope',
    '$location',
    'flatFactory'
  ];

  function newFlatController($scope, $location, flatFactory) {
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

      flatFactory.add($scope.flat).then(function(resp) {
        //TODO ver que hacer con los resp.matesNotRegistered
        console.log(resp);
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
  };

})();