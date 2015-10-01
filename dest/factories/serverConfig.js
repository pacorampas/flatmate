/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function serverConfig() {
        var config = {
            host: "flatmateapp.herokuapp.com",
            port: "",
            protocol: "http://"
        };
        return {
            host: config.host,
            port: config.port,
            protocol: config.protocol,
            server: config.protocol + config.host + config.port
        };
    }
    angular.module("flatMate").factory("serverConfig", serverConfig);
}();