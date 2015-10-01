/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function httpRequestInterceptor(authFactory) {
        return {
            request: function(config) {
                var token = authFactory.getToken();
                return config.url.indexOf("apis") > -1 && (config.url = -1 === config.url.indexOf("?") ? config.url + "?" : config.url + "&", 
                config.url = config.url + "authorization=" + token, config.headers.Authorization = token), 
                config;
            }
        };
    }
    angular.module("flatMate").factory("httpRequestInterceptor", httpRequestInterceptor), 
    httpRequestInterceptor.$inject = [ "authFactory" ];
}();