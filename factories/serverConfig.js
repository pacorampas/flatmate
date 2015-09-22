(function() {
  'use strict';

  angular
    .module('flatMate')
    .factory('serverConfig', serverConfig);

  function serverConfig() {
    var config = {
      //host: 'localhost',
      //port: ':3000',
      host: 'flatmateapp.herokuapp.com',
      port: '',
      protocol: 'http://'
    }
    return {
      host: config.host,
      port: config.port,
      protocol: config.protocol,
      server: config.protocol+config.host+config.port
    }
  }

})();
