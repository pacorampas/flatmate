App.directive('fmSelect', function() {
  return {
    restrict: 'AE',
    scope: {
      options: '=',
      selected: '=',
      defaultValue: '='
    },
    templateUrl: 'directives/templates/fm-select.html',
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) {
          if (!scope.selected) {
            if (scope.defaultValue) {
              scope.selected = -1;
            } else {
              scope.selected = 0;
            }
          }

          setSelectedValue(scope.selected);

          scope.clickOnItem = function(index) {
            event.stopPropagation();
            setSelectedValue(index);
            iElement.removeClass('open');
          }

          iElement.on('click', function() {
            iElement.addClass('open');
          })

          function setSelectedValue(index) {
            if (index === -1) {
              scope.selectedValue = scope.defaultValue;
            } else {
              scope.selectedValue = scope.options[index];
            }
            scope.selected = index;
          }
        },
        //the same of link
        post: function postLink(scope, iElement, iAttrs, controller) {
          scope.$on("$destroy", function handleDestroyEvent() {
            iElement.off('click');
          })
        }
      }
    }
  };
});
