/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function flatFactory($http, serverConfig, $q, userFactory, $rootScope) {
        function matesNotRegistered(matesEmailsSended, matesSaved) {
            for (var matesNotRegistered = new Array(), i = 0, l = matesEmailsSended.length; l > i; i++) {
                for (var found = !1, j = 0, len = matesSaved.length; len > j; j++) matesEmailsSended[i] !== matesSaved[j].email || (found = !0);
                found || matesNotRegistered.push(matesEmailsSended[i]);
            }
            return matesNotRegistered;
        }
        var server = serverConfig.server;
        return {
            getAll: function() {
                return $http.get(server + "/apis/flats/all");
            },
            add: function(flat) {
                return $q(function(resolve, reject) {
                    $http.post(server + "/apis/flat", flat).then(function(resp) {
                        userFactory.updateSessionFlat(resp.data), resp.matesNotRegistered = matesNotRegistered(flat.mates, resp.data.mates), 
                        resolve(resp);
                    })["catch"](function(err) {
                        reject(err);
                    });
                });
            },
            update: function(flat) {
                return $q(function(resolve, reject) {
                    $http.put(server + "/apis/flat", flat).then(function(resp) {
                        userFactory.updateSessionFlat(resp.data), resp.matesNotRegistered = matesNotRegistered(flat.mates, resp.data.mates), 
                        resolve(resp);
                    })["catch"](function(err) {
                        reject(err);
                    });
                });
            },
            addTask: function(flatId, task) {
                return $q(function(resolve, reject) {
                    $http.post(server + "/apis/flat/" + flatId + "/task", task).then(function(resp) {
                        userFactory.updateSessionFlat(resp.data), resolve(resp);
                    })["catch"](function(err) {
                        reject(err);
                    });
                });
            },
            addSpinTask: function(flatId, task) {
                return $q(function(resolve, reject) {
                    $http.post(server + "/apis/flat/" + flatId + "/spin-task", task).then(function(resp) {
                        userFactory.updateSessionFlat(resp.data), resolve(resp);
                    })["catch"](function(err) {
                        reject(err);
                    });
                });
            },
            markTaskAsDone: function(flat, task) {
                return $q(function(resolve, reject) {
                    $http.post(server + "/apis/flat/" + flat._id + "/task/" + task._id).then(function(resp) {
                        userFactory.updateSessionFlat(resp.data.flat), resolve(resp.data);
                    })["catch"](function(err) {
                        reject(err);
                    });
                });
            }
        };
    }
    angular.module("flatMate").factory("flatFactory", flatFactory), flatFactory.$inject = [ "$http", "serverConfig", "$q", "userFactory", "$rootScope" ];
}();