(function() {
  'use strict';

  angular
    .module('flatMate')
    .directive('fmButton', fmButton);

  function fmButton() {
    return {
      restrict: 'AE',
      scope: {
        active: '=',
        loading: '='
      },
      transclude: true,
      templateUrl: 'directives/fm-button/fm-button.html',
      compile: function compile(tElement, tAttrs, transclude) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) {
            if (!iAttrs.active) {
              return;
            }

            scope.$watch('active', function(val) {
              if (!val) {
                iElement.attr('disabled', 'disabled');
              } else {
                iElement.removeAttr('disabled');
              }
            });
          }
        }
      }
    };
  };

})();
