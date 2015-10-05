(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('editFlatController', editFlatController);

  editFlatController.$inject = [
    '$scope',
    '$rootScope',
    '$location',
    'flatFactory',
    'userFactory'
  ];

  function editFlatController($scope, $rootScope, $location, flatFactory,
                              userFactory) {
    activate();

    $scope.updateFlat = function() {
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

      flatFactory.update(flat).then(function(resp) {
        //TODO ver que hacer con los resp.matesNotRegistered
        $location.path('home');
        $scope.acceptButton.loading = false;
      }).catch(function(err) {
        console.log(err);
        $scope.acceptButton.loading = false;
      });
    }

    function activate() {
      if (!$rootScope.session.flat) {
        $location.path('new-flat');
      }

      var sessionMates = userFactory.getOnlyFlatMates();
      var mates = '';
      for(var i=0, l = sessionMates.length; i < l; i++) {
        mates += sessionMates[i].email
        if (l-1 > i) {
          mates += ', ';
        }
      }

      $scope.flat.name = $rootScope.session.flat.name;
      $scope.flat.mates = mates;
      $scope.flat._id = $rootScope.session.flat._id;
    }
  };

})();