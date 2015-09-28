(function() {
  'use strict';

  angular
    .module('flatMate')
    .controller('newFlatController', newFlatController);

  newFlatController.$inject = [
    '$scope',
    '$location',
    'flatFactory',
    'userFactory'
  ];

  function newFlatController($scope, $location, flatFactory, userFactory) {
    $scope.flat =  {
      name: '',
      mates: ''
    };

    $scope.matesRecomendation = [];

    $scope.acceptButton = {
      loading: false
    };

    $scope.createFlat = function() {
      if (!$scope.newFlatForm.$valid) {
        return;
      }
      $scope.acceptButton.loading = true;

      //clone flat
      //replace all spaces for nothing
      //and make an array
      var flat = JSON.parse(JSON.stringify($scope.flat));
      flat.mates = flat.mates.replace(/ /g,'');
      flat.mates = flat.mates.split(',');
      if (flat.mates[flat.mates.length-1] === '') {
        flat.mates.pop();
      }

      flatFactory.add(flat).then(function(resp) {
        //TODO ver que hacer con los resp.matesNotRegistered
        console.log(resp);
        $location.path('home');
        $scope.acceptButton.loading = false;
      }).catch(function(err) {
        console.log(err);
        $scope.acceptButton.loading = false;
      });
    }

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
      $location.path('home');
    }
  };

})();