App.directive('fmScroller', function($document) {
  return {
    restrict: 'AE',
    controller: function($scope, $element) {
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
  };
});

App.directive('fmSticky', function($document) {
  return {
    restrict: 'AE',
    require: '^fmScroller',
    link: function(scope, element, attrs, controller) {
      var stickyClass = attrs.fmSticky;
      controller.addSticky(element, stickyClass);
    }
  };
});
