(function() {
  'use strict';

  angular
      .module('flatMate')
      .factory('flatNewFactory', flatNewFactory);

  flatNewFactory.$inject = ['$http', 'serverConfig'];

  function flatNewFactory($http, serverConfig) {
    var server = serverConfig.server;

    return {
      getAll: function(user) {
        return $http.get(server+'/apis/users/all');
      }
    }
  }

})();
