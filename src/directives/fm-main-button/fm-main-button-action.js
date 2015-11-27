(function() {
  'use strict';

  angular
    .module('flatMateUI')
    .directive('fmMainButtonAction', fmMainButtonAction);

  function fmMainButtonAction() {
    return {
      restrict: 'AE',
      scope: {},
      require: '^fmMainButton',
      link: function($scope, $element, $attrs, $controller) {
        $controller.addAction($element);
      }
    };
  };

})();
