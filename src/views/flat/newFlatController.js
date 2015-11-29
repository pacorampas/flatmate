(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('newFlatController', newFlatController);

  newFlatController.$inject = [
    '$scope',
    '$rootScope',
    '$location',
    'flatFactory'
  ];

  function newFlatController($scope, $rootScope, $location, flatFactory) {
    activate();

    $scope.createFlat = function() {
      if (!$scope.newFlatForm.$valid) {
        return;
      }
      $scope.acceptButton.loading = true;

      //clone flat
      //replace all spaces for nothing
      //and make an array
      var flat = JSON.parse(JSON.stringify($scope.flat));
      flat.mates = flat.mates.replace(/ /g,'');
      flat.mates = flat.mates.split(',');
      if (flat.mates[flat.mates.length-1] === '') {
        flat.mates.pop();
      }

      flatFactory.add(flat).then(function(resp) {
        //TODO ver que hacer con los resp.matesNotRegistered
        console.log(resp);
        $location.path('home');
        $scope.acceptButton.loading = false;
      }).catch(function(err) {
        console.log(err);
        $scope.acceptButton.loading = false;
      });
    }

    function activate() {
      if ($rootScope.session.flat) {
        $location.path('edit-flat');
      }
    }
  };

})();