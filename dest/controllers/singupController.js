/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function singupController($scope, $location, userFactory) {
        $scope.email = "", $scope.password = "", $scope.passwordRepeat = "", $scope.acceptButton = {
            loading: !1
        }, $scope.save = function() {
            $scope.singupForm.$valid && $scope.password === $scope.passwordRepeat && ($scope.acceptButton.loading = !0, 
            userFactory.register({
                email: $scope.email,
                password: $scope.password
            }).then(function(resp) {
                userFactory.login($scope.email, $scope.password).then(function(resp) {
                    $scope.acceptButton.loading = !1, $location.path("home");
                });
            })["catch"](function(err) {
                console.log(err), $scope.acceptButton.loading = !1;
            }));
        }, $scope.back = function() {
            $location.path("login");
        };
    }
    angular.module("flatMate").controller("singupController", singupController), singupController.$inject = [ "$scope", "$location", "userFactory" ];
}();