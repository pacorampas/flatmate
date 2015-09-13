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
      itIsMe: function(userId, mates) {
        if (userId === null) {
          return true;
        }
        var me = $rootScope.session._id;
        return userId === me;
      }
    };
  };

})();