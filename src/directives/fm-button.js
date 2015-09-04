App.directive('fmButton', function() {
  return {
    restrict: 'AE',
    scope: {
      active: '=',
      loading: '='
    },
    transclude: true,
    templateUrl: 'directives/templates/fm-button.html',
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
        },
        //the same of link
        /*post: function postLink(scope, iElement, iAttrs, controller) {
          
        }*/
      }
    }
  };
});