/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmSticky() {
        return {
            restrict: "AE",
            require: "^fmScroller",
            link: function(scope, element, attrs, controller) {
                var stickyClass = attrs.fmSticky;
                controller.addSticky(element, stickyClass);
            }
        };
    }
    angular.module("flatMate").directive("fmSticky", fmSticky);
}();