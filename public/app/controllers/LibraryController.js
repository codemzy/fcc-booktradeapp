angular.module('BookDuckApp')
.controller('LibraryController', ['$scope', 'books', function($scope, books) {
    $scope.loading = true;
    // GET A LIST OF ANY BOOKS THE USER OWNS OR REQUESTED
    books.booksOwned().success(function(data) {
        $scope.userOwns = data.books_owned;
        $scope.userRequested = data.books_requested;
    });
    // GET A LIST OF ANY BOOKS IN THE LIBRARY WITH AN OWNER
    books.allBooks().success(function(data) {
        $scope.loading = false;
        $scope.allBooks = data;
    });
    // FUNCTION TO SHORTEN DESCRIPTION
    $scope.descriptionLength = function(description) {
      if (description.length > 400) {
        return description.slice(0, 397) + "...";
      } else {
        return description;
      }
    };
    // FUNCTION TO CHECK IF USER OWNS BOOK
    $scope.checkOwns = function(id) {
        for (var i = 0; i < $scope.userOwns.length; i++) {
            if ($scope.userOwns[i] == id) {
                return true;
            }
        }
        return false;
    };
    // FUNCTIONS TO REQUEST BOOK
    $scope.requestBook = function(id) {
        for (var i = 0; i < $scope.allBooks.length; i++) {
            if ($scope.allBooks[i].book_id == id) {
                $scope.allBooks[i].bookRequest = true;
            }
        }
    };
    $scope.cancelRequest = function(id) {
        for (var i = 0; i < $scope.allBooks.length; i++) {
            if ($scope.allBooks[i].book_id == id) {
                $scope.allBooks[i].bookRequest = false;
            }
        }
    };
    // ADD TRADE REQUEST
    $scope.confirmRequest = function(bookID) {
        var deleteIndex =  function(index) {
            $scope.myBooks.splice(index, 1);
        };
        // send the book data to the back end
        books.deleteBook(bookID).success(function(data){
            $scope.message = data.message;
            // remove the addrequest from the book
            for (var i = 0; i < $scope.myBooks.length; i++) {
                if ($scope.myBooks[i].book_id == bookID) {
                    $scope.myBooks[i].deleteRequest = false;
                    deleteIndex(i);
                }
            }
        });
    };
}]);