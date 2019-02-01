(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Category list page
  .state('categories', {
    url: '/categories',
    template: '<categories categories="categoriesCtrl.categories"> </categories>',
    controller: 'CategoriesController as categoriesCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Menu items page
  .state('menuItems', {
    url: '/menu-item/{categoryId}',
    template: '<items menu="menuItemCtrl.menu"> </items>',
    controller: 'MenuItemsController as menuItemCtrl',
    params: {
      categoryId: null
    },
    resolve: {
      menu: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.categoryId);
      }]
    }
  });
}

})();
