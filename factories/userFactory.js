(function() {
  'use strict';

  angular
      .module('flatMate')
      .factory('userFactory', userFactory);

  userFactory.$inject = [
    '$http',
    'serverConfig',
    '$q',
    'authFactory',
    '$location'
  ];

  function userFactory($http, serverConfig, $q, authFactory, $location) {
    var server = serverConfig.server;

    return {
      register: function(user) {
        return $http.post(server+'/register', user);
      },
      login: function(email, password) {
        return $http.get(server+'/login?email='+email+'&password='+password);
      },
      getAll: function(user) {
        return $http.get(server+'/apis/users/all');
      },
      isLoggedIn: function(user) {
        return $q(function(resolve, reject) {
          if (user) {
            resolve(true);
          } else {
            $location.path('login');
            reject(false);
          }
        });
      }
    }
  }

})();
