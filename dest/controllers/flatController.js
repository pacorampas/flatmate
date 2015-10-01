/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function flatController($scope, $rootScope, $location, flatFactory, userFactory) {
        $scope.flat = {
            name: "",
            mates: ""
        }, $scope.matesRecomendation = [], $scope.acceptButton = {
            loading: !1
        }, $scope.searchMate = function() {
            var emails = $scope.flat.mates.slice(0);
            if (!emails) return void ($scope.matesRecomendation = []);
            emails = emails.replace(/ /g, "");
            var emailsArr = emails.split(","), emailNotArr = emails.split(",");
            emailNotArr.pop(), userFactory.userExist(emailsArr[emailsArr.length - 1], emailNotArr).then(function(resp) {
                $scope.matesRecomendation = resp.data;
            });
        }, $scope.selectThisMate = function(index) {
            var mateSelected = $scope.matesRecomendation[index];
            if ($scope.matesRecomendation = [], -1 === $scope.flat.mates.indexOf(",")) $scope.flat.mates = "", 
            $scope.flat.mates += mateSelected.email + ", "; else {
                var end = $scope.flat.mates.lastIndexOf(",") + 1;
                $scope.flat.mates = $scope.flat.mates.substring(0, end), $scope.flat.mates += " " + mateSelected.email + ", ";
            }
        }, $scope.back = function() {
            $location.path("home");
        };
    }
    angular.module("flatMate").controller("flatController", flatController), flatController.$inject = [ "$scope", "$rootScope", "$location", "flatFactory", "userFactory" ];
}();