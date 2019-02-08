(function () {
"use strict";

angular.module('public')
.controller('SignUpFormController', SignUpFormController);

SignUpFormController.$inject = ['MenuService'];
function SignUpFormController(MenuService) {
  var signUpCtrl = this;
  signUpCtrl.user = {};
  signUpCtrl.menuItemError = false;
  signUpCtrl.completed = false;

  signUpCtrl.submit = function () {
  	signUpCtrl.completed = false;

  	// Verify menu item first
  	MenuService.getMenuItem(signUpCtrl.user.menuitem).then(function (response) {
  		signUpCtrl.completed = true;
  		signUpCtrl.menuItemError = false;
      MenuService.saveUserInfo(signUpCtrl.user, response);
  	})
  	.catch(function (error) {
      console.log("Error:");
      console.log(error);
      signUpCtrl.menuItemError = true;
    });
  };
}

})();
