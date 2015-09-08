(function() {
  'use strict';

  angular
      .module('flatMate')
      .factory('httpRequestInterceptor', httpRequestInterceptor);

  httpRequestInterceptor.$inject = ['authFactory'];

  function httpRequestInterceptor(authFactory) {

    return {
       request: function(config) {
        var token = authFactory.getToken();

        //only set authorization if the url is an apis (api secure)
        if (config.url.indexOf('apis') > -1) {
          config.url = (config.url.indexOf('?') === -1) ? config.url+'?' :
            config.url+'&';
          config.url = config.url+'authorization='+token;

          config.headers.Authorization = token;
        }

        return config;
       }
    };
  }

})();
