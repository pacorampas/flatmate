(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('newBasketItemController', newBasketItemController);

  newBasketItemController.$inject = [
    '$controller',
    '$rootScope',
    '$scope'
  ];

  function newBasketItemController($controller, $rootScope, $scope) {
    $controller('newBaseController', {
      $scope: $scope
    });

    activate();

    $scope.save = function() {
      if (!$scope.newBasketItemForm.$valid) {
        return;
      }

      $scope.acceptButton.loading = true;

      //TODO catch errors
      $scope.flatFactory.addBasketItem($rootScope.session.flat,
          $scope.newBasketItem).then(function(resp) {

        $scope.acceptButton.loading = false;
        $scope.$location.path('home/basket');
      }).catch(function(err) {
        console.log(err);
      });
    }

    function activate() {
      $scope.newBasketItem = {
        name: ''
      }
    }
  }

})();
