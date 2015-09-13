(function() {
  'use strict';

  angular
    .module('flatMate')
    .directive('fmSticky', fmSticky);

  function fmSticky() {
    return {
      restrict: 'AE',
      require: '^fmScroller',
      link: function(scope, element, attrs, controller) {
        var stickyClass = attrs.fmSticky;
        controller.addSticky(element, stickyClass);
      }
    };
  };

})();