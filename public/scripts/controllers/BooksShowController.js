angular
  .module('angularBooks')
  .controller('BooksShowController', BooksShowController);

BooksShowController.$inject = ['$http', '$routeParams'];
function BooksShowController ($http,   $routeParams  ) {
  var vm = this;
  vm.book = {};

  $http
    .get('https://super-crud.herokuapp.com/books/' + $routeParams.id)
    .then(function(response) {
      vm.book = response.data;
    });

  vm.editBook = function(book) {
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/books/' + book._id,
      data: book
      })
  }
}