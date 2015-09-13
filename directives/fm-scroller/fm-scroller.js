(function() {
  'use strict';

  angular
    .module('flatMate')
    .directive('fmScroller', fmScroller);

  function fmScroller() {
    return {
      restrict: 'AE',
      controller: fmScrollerController
    };
  };

  fmScrollerController.$inject = [
    '$element'
  ];

  function fmScrollerController($element) {
    var stickyElement = null;
    var stickyClass = null;

    this.addSticky = function(element, stClass) {
      stickyElement = element;
      stickyClass = stClass;
    }

    $element.on('scroll', function(event) {
      var scroller = $element[0];
      if (!stickyElement.hasClass(stickyClass) && scroller.scrollTop >= 56) {
        stickyElement.addClass(stickyClass);
        scroller.classList.add('sticky-active');
      } else if (stickyElement.hasClass(stickyClass) &&
                 scroller.scrollTop <= 56) {
        stickyElement.removeClass(stickyClass);
        scroller.classList.remove('sticky-active');
      }
    })
  }

})();