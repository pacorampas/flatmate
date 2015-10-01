/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmMainButton(cssSupporter) {
        return {
            restrict: "AE",
            scope: {},
            transclude: !0,
            templateUrl: "directives/fm-main-button/fm-main-button.html",
            controller: fmMainButtonController
        };
    }
    function fmMainButtonController($scope, $element, cssSupporter) {
        function moveButton(button, yDisplacement) {
            var transforSupporter = cssSupporter.propertySupporter("transform");
            transforSupporter ? button.css(transforSupporter, "translate3d(0,-" + yDisplacement + "px,0)") : button.css("margin-top", "-" + yDisplacement + "px");
        }
        var buttons = [], _sumTranslationTop = 0, mainActionButton = angular.element($element[0].querySelector(".fm-main-action"));
        $scope.modal = {
            show: !1
        }, this.addAction = function(element) {
            _sumTranslationTop += element[0].clientHeight + 10;
            var newAction = {
                element: element,
                translationTop: _sumTranslationTop
            };
            return buttons.push(newAction) - 1;
        }, $scope.mainAction = function() {
            cssSupporter.forceRenderCSS($element[0], function() {
                if (mainActionButton.hasClass("active")) {
                    mainActionButton.removeClass("active");
                    for (var i = 0, l = buttons.length; l > i; i++) {
                        var button = buttons[i];
                        moveButton(button.element, 0);
                    }
                } else {
                    mainActionButton.addClass("active");
                    for (var i = 0, l = buttons.length; l > i; i++) {
                        var button = buttons[i];
                        moveButton(button.element, button.translationTop);
                    }
                }
            }), $scope.modal.show = $scope.modal.show ? !1 : !0;
        };
    }
    angular.module("flatMate").directive("fmMainButton", fmMainButton), fmMainButtonController.$inject = [ "$scope", "$element", "cssSupporter" ];
}();