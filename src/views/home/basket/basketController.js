(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('basketController', basketController);

  basketController.$inject = [
    '$scope',
    '$state',
    'basketItemService'
  ];

  function basketController($scope, $state, basketItemService) {
    $scope.goToEditBasketItem = function (basketItemToEdit) {
      basketItemService.set(basketItemToEdit);
      $state.go('edit-basket-item', { taskId: basketItemToEdit._id });
    }
  };

})();
