/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function filtersFactory($rootScope) {
        return {
            itIsMe: function(userId) {
                if (null === userId) return !0;
                var me = $rootScope.session._id;
                return userId === me;
            },
            spinTaskForMe: function(history) {
                for (var subtasks = history[history.length - 1].subtasks, i = 0, l = subtasks.length; l > i; i++) if (this.itIsMe(subtasks[i].who)) return subtasks[i];
                return !1;
            }
        };
    }
    angular.module("flatMate").factory("filtersFactory", filtersFactory), filtersFactory.$inject = [ "$rootScope" ];
}();