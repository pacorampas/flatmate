/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function authFactory() {
        return {
            setToken: function(token) {
                localStorage.authToken = token;
            },
            getToken: function() {
                return localStorage.authToken;
            }
        };
    }
    angular.module("flatMate").factory("authFactory", authFactory);
}();