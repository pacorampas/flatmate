App.factory('flatFactory', function($firebaseArray, $window, $firebaseObject) {
  var ref = new Firebase("https://flatmate.firebaseio.com/flats");
  var firebaseFlats = $firebaseArray(ref);

  firebaseFlats.$loaded()
  .then(function(data) {
    //TODO loaded
  })
  .catch(function(error) {
    console.error("Error:", error);
  });

  var online = navigator.onLine;

  var flat = {
    name: '',
    owner: '',
    mates: []
  };

  $window.addEventListener('online', function() {
    online = navigator.onLine;
  });

  $window.addEventListener('offline', function() {
    online = navigator.onLine;
  });

  return {
    getNewFlat: function() {
      return angular.copy(flat);
    },
    getAll: function() {
      return firebaseFlats;
    },
    getFlatByKey: function(key) {
      var refFlatByKey = ref.child(key);
      var flatByKey = $firebaseObject(refFlatByKey);
      return flatByKey.$loaded();
    },
    save: function(flat) {
      if (!online) {
        return;
      }
      return firebaseFlats.$add(flat);
    },
    remove: function(flat) {
      firebaseFlats.$remove(flat);
    }
  };
  
});