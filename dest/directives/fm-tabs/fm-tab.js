/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmTab() {
        return {
            restrict: "AE",
            scope: {},
            require: "^fmTabs",
            link: function(scope, element, attrs, controller) {
                var index = controller.addTab(element, attrs.selected);
                element.on("click", function() {
                    controller.changeSelected(index);
                });
            }
        };
    }
    angular.module("flatMate").directive("fmTab", fmTab);
}();