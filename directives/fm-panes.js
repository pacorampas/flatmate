App.directive('fmPanes', function() {
  return {
    restrict: 'AE',
    scope: {
      selected: '='
    },
    transclude: true,
    templateUrl: 'directives/templates/fm-panes.html',
    controller: function($scope, $element, $compile, $transclude, $sce, cssSupporter) {
      $scope.unWatchTransitionPanes = $scope.$watch('selected', function(newVal) {
        var x = newVal * -100;
        var transforSupporter = cssSupporter.propertySupporter('transform');
        if (transforSupporter) {
          $element.css(transforSupporter, 'translate3d('+x+'%,0,0)');
        }
      });
    },
    link: function($scope) {
      $scope.$on("$destroy", function handleDestroyEvent() {
        $scope.unWatchTransitionPanes();
      })
    }
  };
})
