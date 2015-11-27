(function() {
  'use strict';

  angular
    .module('flatMateUI')
    .directive('fmSticky', fmSticky);

  function fmSticky() {
    return {
      restrict: 'AE',
      scope: {
        top: '='
      },
      controller: fmStickyController
    };
  };

  fmStickyController.$inject = [
    '$scope',
    '$element'
  ];

  function fmStickyController($scope, $element) {
    if (!$scope.top) {
      $scope.top = 0;
    }

    $element.on('scroll', function(event) {
      var scroller = $element;
      if (!scroller.hasClass('sticky-active') &&
        scroller[0].scrollTop >= $scope.top) {
        scroller.addClass('sticky-active');
      } else if (scroller.hasClass('sticky-active') &&
                 scroller[0].scrollTop <= $scope.top) {
        scroller.removeClass('sticky-active');
      }
    })
  }

})();