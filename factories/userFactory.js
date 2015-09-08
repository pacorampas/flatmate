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
    '$location',
    '$rootScope'
  ];

  function userFactory($http, serverConfig, $q, authFactory, $location, $rootScope) {
    var server = serverConfig.server;

    return {
      register: function(user) {
        return $http.post(server+'/register', user);
      },
      login: function(email, password) {
        return $http.get(server+'/login?email='+email+'&password='+password);
      },
      logout: function() {
        $rootScope.session = null;
        authFactory.setToken(null);
      },
      getAll: function(user) {
        return $http.get(server+'/apis/users/all');
      },
      //publicPath = boolean
      //is is true is for public path that are not accesible if the user is
      //logged in yet
      //TODO: improve
      isLoggedIn: function(publicPath) {
        return $q(function(resolve, reject) {
          if ($rootScope.session) {
            if (publicPath) {
              $location.path('home');
              reject(false);
            } else {
              resolve(true);
            }
          } else {
            $http.get(server+'/apis/get-user-session').then(function(resp) {
              if (resp.data.user) {
                $rootScope.session = resp.data.user;
                if (publicPath) {
                  $location.path('home');
                  reject(false);
                } else {
                  resolve(true);
                }
              } else {
                if (publicPath) {
                  resolve(true);
                } else {
                  $location.path('login');
                  reject(false);
                }
              }
            }).catch(function(err) {
              if (publicPath) {
                resolve(true);
              } else {
                $location.path('login');
                reject(false);
              }
            });
          }
        });
      }
    }
  }

})();
