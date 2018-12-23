(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  $scope.dishes = "";
  $scope.message = "";

  $scope.checkDishes = function () {
    $scope.message = getCheckDishesMessage($scope.dishes);
  };


  function getCheckDishesMessage(dishes) {
    if (dishes == "") {
      return "Please enter data first";
    }

    var dishesArrary = dishes.split(',')
    if (dishesArrary.length <= 3) {
      return "Enjoy!";
    } else {
      return "Too much!";
    }
  }

});


})();
