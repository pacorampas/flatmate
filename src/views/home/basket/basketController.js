(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('basketController', basketController);

  basketController.$inject = [
    '$scope'
  ];

  function basketController($scope) {
    activate();

    function activate() {
     console.log('Active :) !!');
    }
  };

})();
