(function() {
  'use strict';

  angular
      .module('flatMate')
      .factory('httpRequestInterceptor', httpRequestInterceptor);

  httpRequestInterceptor.$inject = ['authFactory'];

  function httpRequestInterceptor(authFactory) {

    return {
       request: function(config) {
        config.url = (config.url.indexOf('?') === -1) ? config.url+'?' :
            config.url+'&';
        config.url = config.url+'authorization='+authFactory.getToken();

        config.headers.Authorization = authFactory.getToken();

        console.log(config);
        return config;
       }
    };
  }

})();
