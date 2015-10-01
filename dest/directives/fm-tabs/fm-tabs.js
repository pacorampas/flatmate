/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmTabs() {
        return {
            restrict: "AE",
            scope: {},
            transclude: !0,
            templateUrl: "directives/fm-tabs/fm-tabs.html",
            controller: fmTabsController
        };
    }
    function fmTabsController($scope, $element) {
        var tabs = [], indicator = null, selected = null;
        this.addTab = function(element, isSelected) {
            var newTab = {
                element: element,
                width: element[0].clientWidth,
                left: element[0].offsetLeft
            }, len = tabs.push(newTab);
            return this.setUpSelected(len - 1), len - 1;
        }, this.addIndicator = function(element) {
            indicator = element, this.moveIndicator(tabs[selected].width, tabs[selected].left);
        }, this.changeSelected = function(index) {
            if (index !== selected) {
                var oldSelected = tabs[selected], newSelected = tabs[index];
                oldSelected.element.removeAttr("selected"), newSelected.element.attr("selected", "true"), 
                selected = index, this.moveIndicator(newSelected.width, newSelected.left);
            }
        }, this.setUpSelected = function(index, isSelected) {
            null === selected ? (selected = 0, tabs[selected].element.attr("selected", "true")) : isSelected && this.changeSelected(index);
        }, this.moveIndicator = function(width, left) {
            indicator && indicator.css({
                width: width + "px",
                left: left + "px"
            });
        };
    }
    angular.module("flatMate").directive("fmTabs", fmTabs), fmTabsController.$inject = [ "$scope", "$element" ];
}();