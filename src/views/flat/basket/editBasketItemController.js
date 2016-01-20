(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('editBasketItemController', editBasketItemController);

  editBasketItemController.$inject = [
    '$controller',
    '$rootScope',
    '$scope',
    'basketItemService'
  ];

  function editBasketItemController($controller, $rootScope, $scope,
      basketItemService) {

    $controller('newBaseController', {
      $scope: $scope
    });

    activate();

    $scope.save = function() {
      if (!$scope.editBasketItemForm.$valid) {
        return;
      }

      $scope.acceptButton.loading = true;

      //TODO catch errors
      $scope.flatFactory.updateBasketItem($rootScope.session.flat,
          $scope.editBasketItem).then(function(resp) {

        $scope.basketItem.name = $scope.editBasketItem.name;
        $scope.acceptButton.loading = false;
        $scope.$location.path('home/basket');
      }).catch(function(err) {
        console.log(err);
      });
    }

    function activate() {
      $scope.basketItem = basketItemService.get();
      $scope.editBasketItem = angular.copy($scope.basketItem);
    }
  }

})();
