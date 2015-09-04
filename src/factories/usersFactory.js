App.factory('usersFactory', function($firebaseArray, $firebaseObject, $window) {
  var ref = new Firebase("https://flatmate.firebaseio.com/users");

  var online = navigator.onLine;

  $window.addEventListener('online', function() {
    online = navigator.onLine;
  });

  $window.addEventListener('offline', function() {
    online = navigator.onLine;
  });

  return {
    getUserByEmail: function(email) {
      var refUserByEmail = ref.orderByChild('email').startAt(email)
          .endAt(email);
      var userByEmail = $firebaseArray(refUserByEmail);
      return userByEmail.$loaded();
    },
    getUserByKey: function(key) {
      var refUserByKey = ref.child(key);
      var userByKey = $firebaseObject(refUserByKey);
      return userByKey.$loaded();
    },
    //Limbo is where we store a users invities into a flat but already they are
    //sing up into the app
    setUserIntoLimbo: function(email, flatId, callback) {
      this.getUserLimboByEmail(email).then(function(userIntoLimbo) {
        if (userIntoLimbo.length <= 0) {
          var userLimbo = {
            email: email,
            flats: [flatId]
          }
          return userIntoLimbo.$add(userLimbo);
        } else {
          userIntoLimbo[0].flats.push(flatId);
          userIntoLimbo.$save(userIntoLimbo[0]).then(function(){
            if (callback) {
              callback();
            }
          });
        }
      });
    },
    getUserLimboByEmail: function(email) {
      var limbo = ref.child('limbo').orderByChild('email').startAt(email)
          .endAt(email);

      return $firebaseArray(limbo).$loaded();
    }
  };
});
