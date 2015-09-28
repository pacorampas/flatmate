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

  function userFactory($http, serverConfig, $q, authFactory, $location,
                                                                   $rootScope) {
    var server = serverConfig.server;

    function updateSessionFlat(flat) {
      $rootScope.session.flat = flat;
      //the owner is a mate for the client side
      if ($rootScope.session.flat) {
        $rootScope.session.flat.mates.push($rootScope.session.flat.owner);
      }
    }

    return {
      register: function(user) {
        return $http.post(server+'/register', user);
      },
      login: function(email, password) {
        var deferred = $q.defer();
        $http.get(server+'/login?email='+email+'&password='+password)
                                                          .then(function(resp) {
          authFactory.setToken(resp.data.token);
          $rootScope.session = resp.data.user;
          if(resp.data.user.flat) {
            updateSessionFlat(resp.data.user.flat);
          }
          deferred.resolve(resp);
        }).catch(function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },
      logout: function() {
        $rootScope.session = null;
        authFactory.setToken(null);
      },
      getAll: function(user) {
        return $http.get(server+'/apis/users/all');
      },
      userExist: function(email, notIn) {
        return $http.get(server+'/apis/user-exist?email='+email+'&notIn='+JSON.stringify(notIn));
      },
      updateSessionFlat: updateSessionFlat,
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
                updateSessionFlat(resp.data.user.flat);

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
