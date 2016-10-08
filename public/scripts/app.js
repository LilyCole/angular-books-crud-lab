angular
  .module('angularBooks', ['ngRoute'])
  .config(config)

config.$inject = ['$routeProvider', '$locationProvider'];
function config(   $routeProvider,  $locationProvider   ) {
  $routeProvider
    .when('/', {
      templateUrl: '/views/templates/books-index.html',
      controllerAs: 'booksIndexCtrl',
      controller: 'BooksIndexController'
    })
    .when('/books/:id', {
      templateUrl: '/views/templates/books-show.html',
      controllerAs: 'booksShowCtrl',
      controller: 'BooksShowController'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}