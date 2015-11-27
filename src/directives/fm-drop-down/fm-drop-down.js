(function() {
  'use strict';

  angular
    .module('flatMateUI')
    .directive('fmDropDown', fmDropDown);

  function fmDropDown() {
    return {
      restrict: 'AE',
      scope: {},
      replace: true,
      transclude: true,
      templateUrl: 'directives/fm-drop-down/fm-drop-down.html',
      link: function($scope, $element, $attrs, $controller) {
        $scope.open = function() {
          openDropDown();
        }
        $scope.close = function() {
          closeDropDown();
        }

        var fmSelectDropDown = angular.element($element[0].querySelector('.fm-select-drop-down'));
        fmSelectDropDown[0].addEventListener('click', closeDropDown);

        $scope.$on('$destroy', function handleDestroyEvent() {
          fmSelectDropDown[0].removeEventListener('click', closeDropDown);
        })

        function openDropDown() {
          $element.addClass('open');
        }

        function closeDropDown() {
          $element.removeClass('open');
        }
      }
    };
  };

})();
