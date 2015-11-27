(function() {
  'use strict';

  angular.module('flatMate',
    [
      'ngRoute',
      'ngAnimate',
      'flatMateUI'
    ]
  );

  window.onload = function() {
    angular.bootstrap(document.body, ['flatMate']);
  }

})();
