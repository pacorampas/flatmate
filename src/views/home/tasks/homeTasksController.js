(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('homeTasksController', homeTasksController);

  homeTasksController.$inject = [
    '$scope'
  ];

  function homeTasksController($scope) {
    activate();

    function activate() {
     console.log('Active :) Home Tasks !!');
    }
  };

})();
