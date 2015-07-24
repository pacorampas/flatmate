App.factory('taskFactory', function($firebaseArray, $window) {
  var ref = new Firebase("https://flatmate.firebaseio.com/tasks");
  var firebaseTasks = $firebaseArray(ref);

  firebaseTasks.$loaded()
  .then(function(data) {
    //TODO loaded
  })
  .catch(function(error) {
    console.error("Error:", error);
  });

  var online = navigator.onLine;

  var task = {
    name: '',
    spin: false,
    date: new Date(),
    price: 0
  };

  $window.addEventListener('online', function() {
    online = navigator.onLine;
  });

  $window.addEventListener('offline', function() {
    online = navigator.onLine;
  });

  return {
    getNewTask: function() {
      return angular.copy(task);
    },
    getAll: function() {
      return firebaseTasks;
    },
    save: function(task) {
      if (!online) {
        return;
      }
      task.date = task.date.toJSON();
      firebaseTasks.$add(task);
    },
    remove: function(task) {
      firebaseTasks.$remove(task);
    }
  };
  
});