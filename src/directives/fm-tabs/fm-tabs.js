(function() {
  'use strict';

  angular
    .module('flatMate')
    .directive('fmTabs', fmTabs);

  function fmTabs() {
    return {
      restrict: 'AE',
      scope: {},
      transclude: true,
      templateUrl: 'directives/fm-tabs/fm-tabs.html',
      controller: fmTabsController
    };
  };

  fmTabsController.$inject = ['$scope', '$element'];

  function fmTabsController($scope, $element) {
    var tabs = [];
    var indicator = null;
    var selected = null;

    this.addTab = function(element, isSelected) {
      var newTab = {
        element: element,
        width: element[0].clientWidth,
        left: element[0].offsetLeft
      }

      var len = tabs.push(newTab);

      this.setUpSelected(len-1);

      return len-1;
    }

    this.addIndicator = function(element) {
      indicator = element;
      this.moveIndicator(tabs[selected].width, tabs[selected].left);
    }

    this.changeSelected = function(index) {
      if (index === selected) {
        return;
      }

      var oldSelected = tabs[selected];
      var newSelected = tabs[index];
      oldSelected.element.removeAttr('selected');
      newSelected.element.attr('selected', 'true');
      selected = index;

      this.moveIndicator(newSelected.width, newSelected.left);
    }

    this.setUpSelected = function(index, isSelected) {
      if (selected === null) {
        selected = 0;
        tabs[selected].element.attr('selected', 'true');
      } else if (isSelected) {
        this.changeSelected(index);
      }
    }

    this.moveIndicator = function(width, left) {
      if (!indicator) {
        return;
      }
      indicator.css({
        'width': width+'px',
        'left': left+'px'
      });
    }
  }

})();