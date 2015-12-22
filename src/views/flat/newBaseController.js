(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('newBaseController', newBaseController);

  newBaseController.$inject = [
    '$scope',
    '$location',
    'flatFactory'
  ];

  function newBaseController($scope, $location, flatFactory) {
    $scope.$location = $location;

    $scope.flatFactory = flatFactory;

    $scope.acceptButton = { loading: false };

    $scope.back = function() {
      $location.path('home/home-tasks');
    }
  }

})();
