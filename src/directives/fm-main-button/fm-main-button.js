(function() {
  'use strict';

  angular
    .module('flatMateUI')
    .directive('fmMainButton', fmMainButton);

  function fmMainButton(cssSupporter) {
    return {
      restrict: 'AE',
      scope: {},
      transclude: true,
      templateUrl: 'directives/fm-main-button/fm-main-button.html',
      controller: fmMainButtonController
    };
  };

  fmMainButtonController.$inject = [
    '$scope',
    '$element',
    'cssSupporter'
  ];

  function fmMainButtonController($scope, $element, cssSupporter) {
    var buttons = [];
    var _sumTranslationTop = 0;
    var mainActionButton =
        angular.element($element[0].querySelector('.fm-main-action'));
    $scope.modal = {show : false};

    this.addAction = function(element) {
      _sumTranslationTop += element[0].clientHeight+10;

      var newAction = {
        element: element,
        translationTop: _sumTranslationTop
      }

      return buttons.push(newAction) -1;
    }

    $scope.mainAction = function() {
      //It is use because webkit has an issue and not render the styles
      cssSupporter.forceRenderCSS($element[0], function(){
        if (mainActionButton.hasClass('active')) {
          mainActionButton.removeClass('active');
          for(var i = 0, l = buttons.length; i < l; i++) {
            var button = buttons[i];
            moveButton(button.element, 0);
          }
        } else {
          mainActionButton.addClass('active');
          for(var i = 0, l = buttons.length; i < l; i++) {
            var button = buttons[i];
            moveButton(button.element, button.translationTop);
          }
        }
      });
      $scope.modal.show = $scope.modal.show ? false : true;
    }

    function moveButton(button, yDisplacement) {
      var transforSupporter = cssSupporter.propertySupporter('transform');
      if (transforSupporter) {
        button.css(transforSupporter, 'translate3d(0,-'+yDisplacement+'px,0)');
      } else {
        button.css('margin-top', '-'+yDisplacement+'px');
      }
    }
  }

})();
