(function() {
  'use strict';

  angular
    .module('flatMate')
    .directive('fmPanes', fmPanes);

  function fmPanes() {
    return {
      restrict: 'AE',
      scope: {
        selected: '='
      },
      transclude: true,
      templateUrl: 'directives/fm-panes/fm-panes.html',
      controller: fmPanesController,
      link: function($scope) {
        $scope.$on("$destroy", function handleDestroyEvent() {
          $scope.unWatchTransitionPanes();
        })
      }
    };
  };

  fmPanesController.$inject = [
    '$scope',
    '$element',
    'cssSupporter'
  ];

  function fmPanesController($scope, $element, cssSupporter) {
      $scope.unWatchTransitionPanes = $scope.$watch('selected', function(newVal) {
        var x = newVal * -100;
        var transforSupporter = cssSupporter.propertySupporter('transform');
        if (transforSupporter) {
          $element.css(transforSupporter, 'translate3d('+x+'%,0,0)');
        }
      });
    }

})();