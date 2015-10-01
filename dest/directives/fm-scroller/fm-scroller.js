/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function fmScroller() {
        return {
            restrict: "AE",
            controller: fmScrollerController
        };
    }
    function fmScrollerController($element) {
        var stickyElement = null, stickyClass = null;
        this.addSticky = function(element, stClass) {
            stickyElement = element, stickyClass = stClass;
        }, $element.on("scroll", function(event) {
            var scroller = $element[0];
            !stickyElement.hasClass(stickyClass) && scroller.scrollTop >= 56 ? (stickyElement.addClass(stickyClass), 
            scroller.classList.add("sticky-active")) : stickyElement.hasClass(stickyClass) && scroller.scrollTop <= 56 && (stickyElement.removeClass(stickyClass), 
            scroller.classList.remove("sticky-active"));
        });
    }
    angular.module("flatMate").directive("fmScroller", fmScroller), fmScrollerController.$inject = [ "$element" ];
}();