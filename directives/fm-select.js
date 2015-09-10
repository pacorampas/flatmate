//TODO it don't work well without selectedKey and selectedKeyValue.
//Make it easy. Show tempalte also.
App.directive('fmSelect', function() {
  return {
    restrict: 'AE',
    scope: {
      options: '=',
      selected: '=',
      selectedKey: '=',
      defaultValue: '=',
      selectedValueKey: '='
    },
    templateUrl: 'directives/templates/fm-select.html',
    compile: function compile(tElement, tAttrs, transclude) {
      return {
        pre: function preLink(scope, iElement, iAttrs, controller) {
          if (!scope.selected) {
            if (scope.defaultValue) {
              scope.selected = null;
            } else {
              scope.selected = scope.selectedKey ?
                               scope.options[0][scope.selectedKey] :
                               0;
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
            if (index === null) {
              scope.selectedValue = scope.defaultValue;
              scope.selected = null;
            } else {
              scope.selectedValue = scope.selectedValueKey ?
                                  scope.options[index][scope.selectedValueKey] :
                                  scope.options[index];

              scope.selected = scope.selectedKey ?
                               scope.options[index][scope.selectedKey] :
                               index;
            }
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
