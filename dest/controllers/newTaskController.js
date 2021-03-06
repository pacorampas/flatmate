/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function newTaskController($rootScope, $scope, $location, flatFactory) {
        $scope.newTask = {
            title: "",
            who: null,
            spin: !1
        }, $scope.acceptButton = {
            loading: !1
        }, $scope.save = function() {
            $scope.newTaskForm.$valid && ($scope.acceptButton.loading = !0, flatFactory.addTask($rootScope.session.flat._id, $scope.newTask).then(function(resp) {
                $scope.acceptButton.loading = !1, $location.path("home");
            }));
        }, $scope.back = function() {
            $location.path("home");
        };
    }
    angular.module("flatMate").controller("newTaskController", newTaskController), newTaskController.$inject = [ "$rootScope", "$scope", "$location", "flatFactory" ];
}();