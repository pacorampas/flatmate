var App = angular.module('flatMate',
  [
    'ngRoute',
    'ngAnimate'
  ]
);

window.onload = function() {
  angular.bootstrap(document.body, ['flatMate']);
}
