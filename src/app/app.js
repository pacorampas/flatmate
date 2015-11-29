(function() {
  'use strict';

  angular.module('flatMate',
    [
      'ui.router',
      'ngAnimate',
      'flatMateUI'
    ]
  );

  window.onload = function() {
    angular.bootstrap(document.body, ['flatMate']);
  }

})();
