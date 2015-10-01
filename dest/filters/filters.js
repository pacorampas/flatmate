/*! flatmate-client 2015-10-01 */
!function() {
    "use strict";
    function isMyTask(filtersFactory) {
        return function(task) {
            return task.spin ? filtersFactory.spinTaskForMe(task.history) : filtersFactory.itIsMe(task.who);
        };
    }
    function spinTaskForMe(filtersFactory) {
        return function(history) {
            return filtersFactory.spinTaskForMe(history).subtask.value;
        };
    }
    function whoIs(filtersFactory) {
        return function(input, mates) {
            if (-1 == input) return "Todos";
            var me = filtersFactory.itIsMe(input);
            if (me) return "Pringas";
            var mateEmail = null;
            return mates.forEach(function(mate) {
                return mate._id === input ? void (mateEmail = mate.email) : void 0;
            }), mateEmail;
        };
    }
    function noTasksForMe(filtersFactory) {
        return function(tasks) {
            if (!tasks || "undefined" == typeof tasks) return !0;
            for (var i = 0, l = tasks.length; l > i; i++) {
                if (tasks[i].spin && filtersFactory.spinTaskForMe(tasks[i].history)) return !1;
                if (filtersFactory.itIsMe(tasks[i].who)) return !1;
            }
            return !0;
        };
    }
    function taskIsDone(filtersFactory) {
        return function(task) {
            if (task.spin) {
                var subtaskForMe = filtersFactory.spinTaskForMe(task.history);
                return subtaskForMe.done;
            }
            return task.done;
        };
    }
    function spinTaskAllDone() {
        return function(spinTask) {
            if (!spinTask.spin) return !1;
            for (var subtasks = spinTask.history[spinTask.history.length - 1].subtasks, i = 0, l = subtasks.length; l > i; i++) if (!subtasks[i].done) return !0;
            return !1;
        };
    }
    angular.module("flatMate").filter("isMyTask", isMyTask), isMyTask.$inject = [ "filtersFactory" ], 
    angular.module("flatMate").filter("spinTaskForMe", spinTaskForMe), spinTaskForMe.$inject = [ "filtersFactory" ], 
    angular.module("flatMate").filter("whoIs", whoIs), whoIs.$inject = [ "filtersFactory" ], 
    angular.module("flatMate").filter("noTasksForMe", noTasksForMe), noTasksForMe.$inject = [ "filtersFactory" ], 
    angular.module("flatMate").filter("taskIsDone", taskIsDone), taskIsDone.$inject = [ "filtersFactory" ], 
    angular.module("flatMate").filter("spinTaskAllDone", spinTaskAllDone);
}();