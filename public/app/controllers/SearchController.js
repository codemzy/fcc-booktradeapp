angular.module('BookDuckApp')
.controller('SearchController', ['$scope', 'search', function($scope, search) {
    // GET A LIST OF ANY BOOKS THE USER OWNS
    search.booksOwned().success(function(data) {
        $scope.userOwns = data.books_owned;
    });
    // SEARCH FOR BOOKS BASED ON SEARCH TERMS
    $scope.bookSearch = function() {
        if (!$scope.bookTerms) {
            $scope.message = "You need to enter a book name or ISBN code to search.";
        } else {
            $scope.message = false;
            $scope.loading = true;
            search.bookSearch($scope.bookTerms).success(function(data) {
                $scope.bookItems = data.items;
                $scope.totalItems = data.totalItems;
                $scope.loading = false;
            }).error(function(error) {
                $scope.loading = false;
                $scope.message = "There was no data found for this book.";
            });
        }
    };
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
    // FUNCTIONS TO ADD BOOK
    $scope.requestAdd = function(id) {
        for (var i = 0; i < $scope.bookItems.length; i++) {
            if ($scope.bookItems[i].id == id) {
                $scope.bookItems[i].addRequest = true;
            }
        }
    };
    $scope.cancelAdd = function(id) {
        for (var i = 0; i < $scope.bookItems.length; i++) {
            if ($scope.bookItems[i].id == id) {
                $scope.bookItems[i].addRequest = false;
            }
        }
    };
    // TO DO ADD BOOK TO MY BOOKS
    $scope.addBook = function(bookInfo) {
        var bookData = $.param(bookInfo);
        $scope.userOwns.push(bookInfo.id);
        $scope.addRequest = false;
        // send the book data to the back end
        search.addBook(bookData).success(function(data){
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