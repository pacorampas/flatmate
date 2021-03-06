/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmButton() {
        return {
            restrict: "AE",
            scope: {
                active: "=",
                loading: "="
            },
            transclude: !0,
            templateUrl: "directives/fm-button/fm-button.html",
            compile: function(tElement, tAttrs, transclude) {
                return {
                    pre: function(scope, iElement, iAttrs, controller) {
                        iAttrs.active && scope.$watch("active", function(val) {
                            val ? iElement.removeAttr("disabled") : iElement.attr("disabled", "disabled");
                        });
                    }
                };
            }
        };
    }
    angular.module("flatMate").directive("fmButton", fmButton);
}();