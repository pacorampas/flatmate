(function() {
  'use strict';

  angular
    .module('flatMate')
    .factory('flatFactory', flatFactory);

  flatFactory.$inject = [
    '$http',
    'serverConfig',
    '$q',
    'userFactory',
    '$rootScope'
  ];

  function flatFactory($http, serverConfig, $q, userFactory, $rootScope) {
    var server = serverConfig.server;

    function matesNotRegistered(matesEmailsSended, matesSaved) {
      var matesNotRegistered = new Array();
      for(var i = 0, l = matesEmailsSended.length; i < l; i++) {
        var found = false;
        for(var j = 0, len = matesSaved.length; j < len; j++) {
          if (matesEmailsSended[i] === matesSaved[j].email) {
            found = true;
            continue;
          }
        }
        if (!found) {
          matesNotRegistered.push(matesEmailsSended[i]);
        }
      }
      return matesNotRegistered;
    }

    return {
      getAll: function() {
        return $http.get(server+'/apis/flats/all');
      },
      add: function(flat) {
        return $q(function(resolve, reject) {
          $http.post(server+'/apis/flat', flat).then(function(resp) {
            userFactory.updateSessionFlat(resp.data);
            //TODO, alert the user and/or send an invitation email
            resp.matesNotRegistered =
                matesNotRegistered(flat.mates, resp.data.mates);
            resolve(resp);
          }).catch(function(err) {
            reject(err);
          });
        });
      },
      addTask: function(flatId, task) {
        return $q(function(resolve, reject) {
          $http.post(server+'/apis/flat/'+flatId+'/task', task)
                                                          .then(function(resp) {
            userFactory.updateSessionFlat(resp.data);
            resolve(resp);
          }).catch(function(err) {
            reject(err);
          });
        });
      },
      addSpinTask: function(flatId, task) {
        return $q(function(resolve, reject) {
          $http.post(server+'/apis/flat/'+flatId+'/spin-task', task)
                                                          .then(function(resp) {
            userFactory.updateSessionFlat(resp.data);
            resolve(resp);
          }).catch(function(err) {
            reject(err);
          });
        });
      }
    }
  }

})();
