(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['MenuService', 'savedInfo', 'ApiPath'];
function MyInfoController(MenuService, savedInfo, ApiPath) {
  var myInfoCtrl = this;
  myInfoCtrl.savedInfo = savedInfo;
  myInfoCtrl.basePath = ApiPath;

  console.log("saved:");
  console.log(savedInfo);
}

})();
