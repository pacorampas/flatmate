/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function cssSupporter() {
        function browser() {
            var ua = navigator.userAgent;
            return contains(ua, "Firefox") && !contains(ua, "Seamonkey") ? "firefox" : contains(ua, "Seamonkey") ? "Seamonkey" : contains(ua, "Chrome") && !contains(ua, "Chromium") ? "chrome" : contains(ua, "Chromium") ? "chromium" : contains(ua, "Safari") && !contains(ua, "Chrome") || !contains(ua, "Chromium") ? "safari" : contains(ua, "OPR") || contains(ua, "Opera") ? "opera" : contains(ua, ";MSIE") ? "explorer" : void 0;
        }
        function engine() {
            var b = browser();
            return contains(b, "chrome") || contains(b, "safari") || contains(b, "chromium") ? "-webkit-" : contains(b, "firefox") ? "-moz-" : contains(b, "opera") ? "-o-" : contains(b, "explorer") ? "-ms-" : void 0;
        }
        function contains(val, string) {
            return val.search(string) > -1;
        }
        return {
            propertySupporter: function(property) {
                if (property in document.body.style) return property;
                var eng = engine();
                return eng + property in document.body.style ? eng + property : !1;
            },
            forceRenderCSS: function(el, cb) {
                el.style.display = "none", el.offsetHeight, el.style.display = "", setTimeout(function() {
                    cb();
                });
            },
            browser: browser,
            engine: engine
        };
    }
    angular.module("flatMate").factory("cssSupporter", cssSupporter);
}();