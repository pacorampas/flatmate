/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function loginController($scope, $location, userFactory) {
        $scope.email = "", $scope.password = "", $scope.acceptButton = {
            loading: !1
        }, $scope.login = function() {
            $scope.loginForm.$valid && ($scope.acceptButton.loading = !0, userFactory.login($scope.email, $scope.password).then(function(resp) {
                $scope.acceptButton.loading = !1, $location.path("home");
            })["catch"](function(err) {
                alert("Bad credentials."), $scope.acceptButton.loading = !1, console.log(err);
            }));
        };
    }
    angular.module("flatMate").controller("loginController", loginController), loginController.$inject = [ "$scope", "$location", "userFactory" ];
}();