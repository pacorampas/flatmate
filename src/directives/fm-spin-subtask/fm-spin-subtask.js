(function() {
  'use strict';

  angular
    .module('flatMate')
    .directive('fmSpinSubtask', fmSpinSubtask);

  function fmSpinSubtask() {
    return {
      restrict: 'AE',
      scope: {
        value: '='
      },
      templateUrl: 'directives/fm-spin-subtask/fm-spin-subtask.html'
    };
  };

})();
