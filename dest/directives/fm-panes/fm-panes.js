/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmPanes() {
        return {
            restrict: "AE",
            scope: {
                selected: "="
            },
            transclude: !0,
            templateUrl: "directives/fm-panes/fm-panes.html",
            controller: fmPanesController,
            link: function($scope) {
                $scope.$on("$destroy", function() {
                    $scope.unWatchTransitionPanes();
                });
            }
        };
    }
    function fmPanesController($scope, $element, cssSupporter) {
        $scope.unWatchTransitionPanes = $scope.$watch("selected", function(newVal) {
            var x = -100 * newVal, transforSupporter = cssSupporter.propertySupporter("transform");
            transforSupporter && $element.css(transforSupporter, "translate3d(" + x + "%,0,0)");
        });
    }
    angular.module("flatMate").directive("fmPanes", fmPanes), fmPanesController.$inject = [ "$scope", "$element", "cssSupporter" ];
}();