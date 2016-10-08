angular
  .module('angularBooks')
  .controller('BooksIndexController', BooksIndexController);

BooksIndexController.$inject = ['$http','$window'];
function BooksIndexController ($http, $window) {
  var vm = this;
  vm.newBook = {
    title: 'New Book',
    author: 'New Author',
    releaseDate: 'New Date',
    image: 'http://pngimg.com/upload/book_PNG2111.png'
  };
  vm.books = [];

  $http
    .get('https://super-crud.herokuapp.com/books')
    .then(function(response) {
      vm.books = response.data.books;
    });

  vm.createBook = function() {
    $http
      .post('https://super-crud.herokuapp.com/books',vm.newBook)
      .then(function(response) {
        vm.books.push(response.data);
      });
  }

  vm.deleteBook = function(book) {  
    $http
      .delete('https://super-crud.herokuapp.com/books/' + book._id)
      .then(function(response) {
        index = vm.books.indexOf(book);
        vm.books.splice(index,1);
      })
  }

  vm.bookLink = function(bookId) {
    $window.location.href = "/books/"+bookId;
  }
}