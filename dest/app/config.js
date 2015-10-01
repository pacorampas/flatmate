/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function config($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push("httpRequestInterceptor"), $routeProvider.when("/login", {
            templateUrl: "views/login.html",
            controller: "loginController",
            resolve: {
                isloggedIn: function($rootScope, userFactory) {
                    return userFactory.isLoggedIn(!0);
                }
            }
        }).when("/singup", {
            templateUrl: "views/singup.html",
            controller: "singupController",
            resolve: {
                isloggedIn: function($rootScope, userFactory) {
                    return userFactory.isLoggedIn(!0);
                }
            }
        }).when("/home", {
            templateUrl: "views/home.html",
            controller: "homeController",
            resolve: {
                isloggedIn: function($rootScope, userFactory) {
                    return userFactory.isLoggedIn();
                }
            }
        }).when("/new-flat", {
            templateUrl: "views/new-flat.html",
            controller: "flatController",
            resolve: {
                isloggedIn: function($rootScope, userFactory) {
                    return userFactory.isLoggedIn();
                }
            }
        }).when("/edit-flat", {
            templateUrl: "views/edit-flat.html",
            controller: "flatController",
            resolve: {
                isloggedIn: function($rootScope, userFactory) {
                    return userFactory.isLoggedIn();
                }
            }
        }).when("/new-task", {
            templateUrl: "views/new-task.html",
            controller: "newTaskController",
            resolve: {
                isloggedIn: function($rootScope, userFactory) {
                    return userFactory.isLoggedIn();
                }
            }
        }).when("/new-spin-task", {
            templateUrl: "views/new-spin-task.html",
            controller: "newSpinTaskController",
            resolve: {
                isloggedIn: function($rootScope, userFactory) {
                    return userFactory.isLoggedIn();
                }
            }
        }).otherwise({
            redirectTo: "/login"
        });
    }
    angular.module("flatMate").config(config), config.$inject = [ "$routeProvider", "$httpProvider" ];
}();