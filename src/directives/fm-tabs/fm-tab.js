(function() {
  'use strict';

  angular
    .module('flatMateUI')
    .directive('fmTab', fmTab);

  function fmTab() {
    return {
      restrict: 'AE',
      scope: {},
      require: '^fmTabs',
      link: function(scope, element, attrs, controller) {
        var index = controller.addTab(element, attrs.selected);
        element.on('click', function() {
          controller.changeSelected(index);
        })
      }
    };
  };

})();