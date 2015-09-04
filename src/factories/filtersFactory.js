App.factory('filtersFactory', function($rootScope) {
  return {
    itIsMe: function(positionUserIntoMatesArray, mates) {
      if (positionUserIntoMatesArray == -1) {
        return true;
      }
      var me = $rootScope.user.password.email;
      return mates[positionUserIntoMatesArray] === me ? true : false;
    }
  };
});
