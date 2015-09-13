(function() {
  'use strict';

  angular
    .module('flatMate')
    .factory('authFactory', authFactory);

  function authFactory() {
    return {
      setToken: function(token) {
        localStorage.authToken = token;
      },
      getToken: function() {
        return localStorage.authToken;
      }
    }
  }

})();
