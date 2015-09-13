(function() {
  'use strict';

  angular
      .module('flatMate')
      .directive('email', email);

  function email() {
    var EMAIL_REGEXP = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.email = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }

          if (EMAIL_REGEXP.test(viewValue)) {
            // it is valid
            return true;
          }

          // it is invalid
          return false;
        };
      }
    };
  };

  angular
      .module('flatMate')
      .directive('groupemail', groupemail);

  function groupemail() {
    var GROUP_EMAIL_REGEXP = /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?\s*?)+$/;

    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        ctrl.$validators.groupemail = function(modelValue, viewValue) {
          if (ctrl.$isEmpty(modelValue)) {
            // consider empty models to be valid
            return true;
          }

          if (GROUP_EMAIL_REGEXP.test(viewValue)) {
            // it is valid
            return true;
          }

          // it is invalid
          return false;
        };
      }
    };
  };

})();
