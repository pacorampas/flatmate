(function() {
  'use strict';

  angular
    .module('flatMate')
    .factory('filtersFactory', filtersFactory);

  filtersFactory.$inject = [
    '$rootScope'
  ];

  function filtersFactory($rootScope) {
    return {
      itIsMe: function(userId) {
        if (userId === null) {
          return true;
        }
        var me = $rootScope.session._id;
        return userId === me;
      },
      spinTaskForMe: function(history) {
        var subtasks = history[history.length - 1].subtasks;
        for(var i = 0, l = subtasks.length; i < l; i++) {
          if(this.itIsMe(subtasks[i].who)) {
            return subtasks[i].subtask.value;
          }
        }
        return false;
      }
    };
  };

})();