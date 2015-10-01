/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function homeController($scope, $rootScope, $location, userFactory, flatFactory) {
        $scope.paneActive = 0, $scope.logout = function() {
            userFactory.logout(), $location.path("login");
        }, $scope.simpleTask = function(event) {
            event.stopPropagation(), $location.path("/new-task");
        }, $scope.spinTask = function() {
            event.stopPropagation(), $location.path("/new-spin-task");
        }, $scope.changePaneTo = function(pane) {
            $scope.paneActive = pane;
        }, $scope.newFlatButton = function() {
            $location.path("new-flat");
        }, $scope.endTask = function(task, index) {
            $rootScope.user.flat.tasks.splice(index, 1), $rootScope.user.flat.$save().then(function() {
                console.log("Task removed");
            });
        }, $scope.markTaskAsDone = function(task) {
            flatFactory.markTaskAsDone($rootScope.session.flat, task);
        }, $scope.messageEmptyFlatOrTasks = function() {
            var flat = $rootScope.session.flat;
            return flat ? flat.tasks.length ? !1 : "No hay ninguna tarea registrada, comienza a crearlas y asignárselas a tus compañeros." : "Aún no tienes creado ningún piso. Crealo e invita a tus compañeros.";
        };
    }
    angular.module("flatMate").controller("homeController", homeController), homeController.$inject = [ "$scope", "$rootScope", "$location", "userFactory", "flatFactory" ];
}();