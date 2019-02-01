(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuItemsController', MenuItemsController);

MenuItemsController.$inject = ['$stateParams', 'menu'];
function MenuItemsController($stateParams, menu) {
  var menuItemCtrl = this;
  menuItemCtrl.menu = menu;
  console.log("menu is:");
  console.log(menu);
}

})();
