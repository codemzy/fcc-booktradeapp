angular.module('BookDuckApp')
.controller('BooksController', ['$scope', 'books', function($scope, books) {
    $scope.loading = true;
    // GET A LIST OF ANY BOOKS THE USER OWNS
    books.myBooks().success(function(data) {
        $scope.loading = false;
        $scope.myBooks = data;
    });
    // FUNCTION TO SHORTEN DESCRIPTION
    $scope.descriptionLength = function(description) {
      if (description.length > 400) {
        return description.slice(0, 397) + "...";
      } else {
        return description;
      }
    };
    // FUNCTIONS TO ADD BOOK
    $scope.requestDelete = function(id) {
        for (var i = 0; i < $scope.myBooks.length; i++) {
            if ($scope.myBooks[i].id == id) {
                $scope.myBooks[i].deleteRequest = true;
            }
        }
    };
    $scope.cancelDelete = function(id) {
        for (var i = 0; i < $scope.myBooks.length; i++) {
            if ($scope.myBooks[i].id == id) {
                $scope.myBooks[i].deleteRequest = false;
            }
        }
    };
    // TO DO ADD BOOK TO MY BOOKS
    $scope.addBook = function(bookInfo) {
        var bookData = $.param(bookInfo);
        $scope.userOwns.push(bookInfo.id);
        $scope.addRequest = false;
        // send the book data to the back end
        books.addBook(bookData).success(function(data){
            $scope.message = data.message;
            // remove the addrequest from the book
            for (var i = 0; i < $scope.bookItems.length; i++) {
                if ($scope.bookItems[i].id == bookInfo.id) {
                    $scope.bookItems[i].addRequest = false;
                }
            }
        });
    };
}]);