/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmSelect() {
        return {
            restrict: "AE",
            scope: {
                options: "=",
                selected: "=",
                selectedValue: "=",
                selectedKey: "=",
                defaultValue: "=",
                selectedValueKey: "=",
                label: "="
            },
            templateUrl: "directives/fm-select/fm-select.html",
            compile: function(tElement, tAttrs, transclude) {
                return {
                    pre: function(scope, iElement, iAttrs, controller) {
                        function setSelectedValue(index) {
                            null === index ? (scope.selectedValue = scope.defaultValue, scope.selected = null) : (scope.selectedValue = scope.selectedValueKey ? scope.options[index][scope.selectedValueKey] : scope.options[index], 
                            scope.selected = scope.selectedKey ? scope.options[index][scope.selectedKey] : index);
                        }
                        scope.selected || (scope.defaultValue ? scope.selected = null : scope.selected = scope.selectedKey ? scope.options[0][scope.selectedKey] : 0), 
                        setSelectedValue(scope.selected), scope.clickOnItem = function(index) {
                            event.stopPropagation(), setSelectedValue(index), iElement.removeClass("open");
                        }, iElement.on("click", function() {
                            iElement.addClass("open");
                        });
                    },
                    post: function(scope, iElement, iAttrs, controller) {
                        scope.$on("$destroy", function() {
                            iElement.off("click");
                        });
                    }
                };
            }
        };
    }
    angular.module("flatMate").directive("fmSelect", fmSelect);
}();