/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmIndicator() {
        return {
            restrict: "AE",
            scope: {},
            require: "^fmTabs",
            link: function(scope, element, attrs, controller) {
                controller.addIndicator(element);
            }
        };
    }
    angular.module("flatMate").directive("fmIndicator", fmIndicator);
}();