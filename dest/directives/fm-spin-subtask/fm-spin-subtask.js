/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmSpinSubtask() {
        return {
            restrict: "AE",
            scope: {
                value: "="
            },
            templateUrl: "directives/fm-spin-subtask/fm-spin-subtask.html"
        };
    }
    angular.module("flatMate").directive("fmSpinSubtask", fmSpinSubtask);
}();