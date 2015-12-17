(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('menuController', menuController);

  menuController.$inject = [
    '$scope',
    '$rootScope',
    '$location'
  ];

  function menuController($scope, $rootScope, $location) {
    console.log('hi');
  };

})();
