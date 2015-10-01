/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function newFlatController($scope, $rootScope, $location, flatFactory) {
        function activate() {
            $rootScope.session.flat && $location.path("edit-flat");
        }
        activate(), $scope.createFlat = function() {
            if ($scope.newFlatForm.$valid) {
                $scope.acceptButton.loading = !0;
                var flat = JSON.parse(JSON.stringify($scope.flat));
                flat.mates = flat.mates.replace(/ /g, ""), flat.mates = flat.mates.split(","), "" === flat.mates[flat.mates.length - 1] && flat.mates.pop(), 
                flatFactory.add(flat).then(function(resp) {
                    console.log(resp), $location.path("home"), $scope.acceptButton.loading = !1;
                })["catch"](function(err) {
                    console.log(err), $scope.acceptButton.loading = !1;
                });
            }
        };
    }
    angular.module("flatMate").controller("newFlatController", newFlatController), newFlatController.$inject = [ "$scope", "$rootScope", "$location", "flatFactory" ];
}();