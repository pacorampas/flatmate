(function() {
  'use strict';

  angular
    .module('flatMateUI')
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