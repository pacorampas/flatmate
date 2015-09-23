(function() {
  'use strict';

  angular
    .module('flatMate')
    .factory('serverConfig', serverConfig);

  function serverConfig() {
    var config = {
      host: '@@host',
      port: '@@port',
      protocol: '@@protocol'
    }

    return {
      host: config.host,
      port: config.port,
      protocol: config.protocol,
      server: config.protocol+config.host+config.port
    }
  }

})();
