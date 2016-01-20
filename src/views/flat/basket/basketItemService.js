(function() {
  'use strict';

  angular
    .module('flatMate')
    .service('basketItemService', basketItemService);

  function basketItemService() {
    var basketItem = null;
    return {
      set: function(newbasketItem) {
        if (typeof newbasketItem === 'object') {
          basketItem = newbasketItem;
        }
      },
      get: function() {
        return basketItem;
      }
    }
  }

})();
