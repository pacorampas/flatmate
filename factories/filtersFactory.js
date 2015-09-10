App.factory('filtersFactory', function($rootScope) {
  return {
    itIsMe: function(userId, mates) {
      if (userId === null) {
        return true;
      }
      var me = $rootScope.session._id;
      return userId === me;
    }
  };
});
