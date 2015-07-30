App.directive('fmTabs', function() {
  return {
    restrict: 'AE',
    scope: {},
    transclude: true,
    templateUrl: 'directives/templates/fm-tabs.html',
    controller: function($scope, $element, $compile, $transclude, $sce) {
      var tabs = [];
      var indicator = null;
      var selected = 0;

      this.addTab = function(element, isSelected) {
        var newTab = {
          element: element,
          width: element[0].clientWidth,
          left: element[0].offsetLeft,
          selected: isSelected || null
        }

        var len = tabs.push(newTab);
      
        if (newTab.selected) {
          selected = len-1;
        }

        return len-1;
      }

      this.addIndicator = function(element) {
        indicator = element;
        this.moveIndicator(tabs[selected].width, tabs[selected].left);
      }

      this.changeSelected = function(index) {
        var oldSelected = tabs[selected];
        var newSelected = tabs[index];
        oldSelected.element.removeAttr('selected');
        newSelected.element.attr('selected', 'true');
        this.moveIndicator(newSelected.width, newSelected.left);
      }

      this.moveIndicator = function(width, left) {
        indicator.css({
          'width': width+'px',
          'left': left+'px'
        });
      }
    },
  };
});

App.directive('fmTab', function() {
  return {
    restrict: 'AE',
    scope: {},
    require: '^fmTabs',
    link: function(scope, element, attrs, controller) {
      var index = controller.addTab(element, attrs.selected);
      element.on('click', function() {
        controller.changeSelected(index);
      })
    }
  };
});

App.directive('fmIndicator', function() {
  return {
    restrict: 'AE',
    scope: {},
    require: '^fmTabs',
    link: function(scope, element, attrs, controller) {
      controller.addIndicator(element);
    }
  };
});
