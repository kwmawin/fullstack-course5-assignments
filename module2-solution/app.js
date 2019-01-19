(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list = this;

  list.items = ShoppingListCheckOffService.getToBuyItems();

  list.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list = this;

  list.items = ShoppingListCheckOffService.getBoughtItems();
}


// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [{name: "cookies", quantity: 10}, { name: "candies", quantity: 5 }, {name: "sodas", quantity: 5}, {name: "milk", quantity: 3}, {name: "apples", quantity: 2}];
  var boughtItems = [];

  service.buyItem = function (itemIdex) {
    var item = (toBuyItems.splice(itemIdex, 1))[0];
    boughtItems.push(item);
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}


})();
