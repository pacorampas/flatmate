/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function email() {
        var EMAIL_REGEXP = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
        return {
            require: "ngModel",
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.email = function(modelValue, viewValue) {
                    return ctrl.$isEmpty(modelValue) ? !0 : EMAIL_REGEXP.test(viewValue) ? !0 : !1;
                };
            }
        };
    }
    function groupemail() {
        var GROUP_EMAIL_REGEXP = /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?\s*?)+$/;
        return {
            require: "ngModel",
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.groupemail = function(modelValue, viewValue) {
                    return ctrl.$isEmpty(modelValue) ? !0 : GROUP_EMAIL_REGEXP.test(viewValue) ? !0 : !1;
                };
            }
        };
    }
    angular.module("flatMate").directive("email", email), angular.module("flatMate").directive("groupemail", groupemail);
}();