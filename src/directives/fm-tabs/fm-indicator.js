(function() {
  'use strict';

  angular
    .module('flatMate')
    .directive('fmIndicator', fmIndicator);

  function fmIndicator() {
    return {
      restrict: 'AE',
      scope: {},
      require: '^fmTabs',
      link: function(scope, element, attrs, controller) {
        controller.addIndicator(element);
      }
    };
  };

})();