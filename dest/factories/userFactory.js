/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function userFactory($http, serverConfig, $q, authFactory, $location, $rootScope) {
        function updateSessionFlat(flat) {
            $rootScope.session.flat = flat, $rootScope.session.flat && $rootScope.session.flat.mates.push($rootScope.session.flat.owner);
        }
        var server = serverConfig.server;
        return {
            register: function(user) {
                return $http.post(server + "/register", user);
            },
            login: function(email, password) {
                var deferred = $q.defer();
                return $http.get(server + "/login?email=" + email + "&password=" + password).then(function(resp) {
                    authFactory.setToken(resp.data.token), $rootScope.session = resp.data.user, resp.data.user.flat && updateSessionFlat(resp.data.user.flat), 
                    deferred.resolve(resp);
                })["catch"](function(err) {
                    deferred.reject(err);
                }), deferred.promise;
            },
            logout: function() {
                $rootScope.session = null, authFactory.setToken(null);
            },
            getAll: function(user) {
                return $http.get(server + "/apis/users/all");
            },
            userExist: function(email, notIn) {
                return $http.get(server + "/apis/user-exist?email=" + email + "&notIn=" + JSON.stringify(notIn));
            },
            updateSessionFlat: updateSessionFlat,
            getOnlyFlatMates: function() {
                var onlyMates = $rootScope.session.flat.mates.slice(0);
                return onlyMates.pop(), onlyMates;
            },
            isLoggedIn: function(publicPath) {
                return $q(function(resolve, reject) {
                    $rootScope.session ? publicPath ? ($location.path("home"), reject(!1)) : resolve(!0) : $http.get(server + "/apis/get-user-session").then(function(resp) {
                        resp.data.user ? ($rootScope.session = resp.data.user, updateSessionFlat(resp.data.user.flat), 
                        publicPath ? ($location.path("home"), reject(!1)) : resolve(!0)) : publicPath ? resolve(!0) : ($location.path("login"), 
                        reject(!1));
                    })["catch"](function(err) {
                        publicPath ? resolve(!0) : ($location.path("login"), reject(!1));
                    });
                });
            }
        };
    }
    angular.module("flatMate").factory("userFactory", userFactory), userFactory.$inject = [ "$http", "serverConfig", "$q", "authFactory", "$location", "$rootScope" ];
}();