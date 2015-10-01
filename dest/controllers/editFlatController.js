/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function editFlatController($scope, $rootScope, $location, flatFactory, userFactory) {
        function activate() {
            $rootScope.session.flat || $location.path("new-flat");
            var sessionMates = userFactory.getOnlyFlatMates();
            console.log(sessionMates), console.log($rootScope.session.flat);
            for (var mates = "", i = 0, l = sessionMates.length; l > i; i++) mates += sessionMates[i].email, 
            l - 1 > i && (mates += ", ");
            $scope.flat.name = $rootScope.session.flat.name, $scope.flat.mates = mates, $scope.flat._id = $rootScope.session.flat._id;
        }
        activate(), $scope.updateFlat = function() {
            if ($scope.newFlatForm.$valid) {
                $scope.acceptButton.loading = !0;
                var flat = JSON.parse(JSON.stringify($scope.flat));
                flat.mates = flat.mates.replace(/ /g, ""), flat.mates = flat.mates.split(","), "" === flat.mates[flat.mates.length - 1] && flat.mates.pop(), 
                flatFactory.update(flat).then(function(resp) {
                    console.log(resp), $location.path("home"), $scope.acceptButton.loading = !1;
                })["catch"](function(err) {
                    console.log(err), $scope.acceptButton.loading = !1;
                });
            }
        };
    }
    angular.module("flatMate").controller("editFlatController", editFlatController), 
    editFlatController.$inject = [ "$scope", "$rootScope", "$location", "flatFactory", "userFactory" ];
}();