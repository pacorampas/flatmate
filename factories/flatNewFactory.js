(function() {
  'use strict';

  angular
      .module('flatMate')
      .factory('flatNewFactory', flatNewFactory);

  flatNewFactory.$inject = ['$http', 'serverConfig'];

  function flatNewFactory($http, serverConfig) {
    var server = serverConfig.server;

    return {
      getAll: function() {
        return $http.get(server+'/apis/flats/all');
      },
      add: function(flat) {
        return $http.post(server+'/apis/flat', flat);
      }
    }
  }

})();
