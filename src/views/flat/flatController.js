(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('flatController', flatController);

  flatController.$inject = [
    '$scope',
    '$rootScope',
    '$location',
    'flatFactory',
    'userFactory'
  ];

  function flatController($scope, $rootScope, $location, flatFactory, userFactory) {
    $scope.flat =  {
      name: '',
      mates: ''
    };

    $scope.matesRecomendation = [];

    $scope.acceptButton = {
      loading: false
    };

    $scope.searchMate = function() {
      var emails = $scope.flat.mates.slice(0); //clone
      if (!emails) {
        $scope.matesRecomendation = [];
        return;
      }

      emails = emails.replace(/ /g,'');
      var emailsArr = emails.split(',');
      var emailNotArr = emails.split(',');
      emailNotArr.pop();
      userFactory.userExist(emailsArr[emailsArr.length-1], emailNotArr).then(function(resp) {
        $scope.matesRecomendation = resp.data;
      });
    }

    $scope.selectThisMate = function(index) {
      var mateSelected = $scope.matesRecomendation[index];
      $scope.matesRecomendation = [];

      if ($scope.flat.mates.indexOf(',') === -1) {
        $scope.flat.mates = '';
        $scope.flat.mates += mateSelected.email+', ';
      } else {
        var end = $scope.flat.mates.lastIndexOf(',')+1;
        $scope.flat.mates = $scope.flat.mates.substring(0, end);
        $scope.flat.mates += ' '+mateSelected.email+', ';
      }
    }

    $scope.back = function() {
      $location.path('home/home-tasks');
    }
  };

})();