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
      vm.books.forEach(function(value,index) {
        var color = randomColorTest(index);
        value.style = {'background-color': color};
      });
      
    });

  vm.createBook = function() {
    $http
      .post('https://super-crud.herokuapp.com/books',vm.newBook)
      .then(function(response) {
        var newBook = response.data;
        index = vm.books.length;
        var color = randomColorTest(index);
        newBook.style = {'background-color': color};    
        vm.books.push(newBook);
        // vm.books.push(response.data);
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

  var randomColor = function() {
    var safeColors = ['00','33','66','99','cc','ff'];
    // var safeColors = ['00','11','22','33','44','55'];
    var r = safeColors[Math.floor(Math.random()*6)];
    var g = safeColors[Math.floor(Math.random()*6)];
    var b = safeColors[Math.floor(Math.random()*6)];
    return "#"+r+g+b;
  }

  var randomColorTest = function(index) {
    index = index % 17;
    var safeColors = ['#F49AC2','#F49AC2','#C23B22','#FFD1DC','#966FD6',
    '#AEC6CF','#77DD77','#CFCFC4','#B39EB5','#FFB347','#B19CD9','#FF6961',
    '#03C03C','#FDFD96','#836953','#779ECB'];
    return safeColors[index];
  }

}