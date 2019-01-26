(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItemsList', FoundItemsListDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItemsListDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      showError: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController () {
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.foundItems = [];
  menu.searchTerm = "";
  menu.showError = false;

  menu.searchMenu = function () {
    MenuSearchService.getMatchedMenuItems(menu.searchTerm)
    .then(function (response) {
      menu.foundItems = response;
      if (menu.foundItems.length) {
        menu.showError = false;
      } else {
        menu.showError = true;
      }
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

  menu.removeItem = function (itemIndex) {
    menu.foundItems.splice(itemIndex, 1);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    })
    .then(function (response) {
      var foundItems = response.data.menu_items;
      if (searchTerm === "") {
        return [];
      } else {
        return foundItems.filter(item=>item.description.includes(searchTerm));
      }
    });
  };
}

})();
