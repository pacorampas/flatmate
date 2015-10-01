/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmMainButtonAction() {
        return {
            restrict: "AE",
            scope: {},
            require: "^fmMainButton",
            link: function($scope, $element, $attrs, $controller) {
                $controller.addAction($element);
            }
        };
    }
    angular.module("flatMate").directive("fmMainButtonAction", fmMainButtonAction);
}();