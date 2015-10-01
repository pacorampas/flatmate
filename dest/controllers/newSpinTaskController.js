/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function newSpinTaskController($rootScope, $scope, $location, flatFactory) {
        function validateSubtasks() {
            for (var l = $scope.newTask.subtasks.length, i = l - 1; i >= 0; i--) $scope.newTask.subtasks[i].value || $scope.newTask.subtasks.splice(i, 1);
            return $scope.newTask.subtasks.length > 0;
        }
        $scope.newTask = {
            title: "",
            spin: !0,
            period: null,
            subtasks: [ {
                value: ""
            } ]
        }, $scope.periodOptions = [ "Diario", "Semanal", "Mensual", "Anual" ], $scope.acceptButton = {
            loading: !1
        }, $scope.save = function() {
            $scope.newTaskForm.$valid && validateSubtasks() && ($scope.acceptButton.loading = !0, 
            flatFactory.addSpinTask($rootScope.session.flat._id, $scope.newTask).then(function(resp) {
                $scope.acceptButton.loading = !1, $location.path("home");
            })["catch"](function(err) {
                console.log(err);
            }));
        }, $scope.addNewSubtask = function(event) {
            event.preventDefault(), $scope.newTask.subtasks.push({
                value: ""
            });
        }, $scope.back = function() {
            $location.path("home");
        };
    }
    angular.module("flatMate").controller("newSpinTaskController", newSpinTaskController), 
    newSpinTaskController.$inject = [ "$rootScope", "$scope", "$location", "flatFactory" ];
}();