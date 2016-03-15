angular.module('BookDuckApp')
.controller('SearchController', ['$scope', 'search', function($scope, search) {
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
        // get the book data we require TO DO AT THE MO SENDING ALL BOOKINFO

        var bookData = $.param(bookInfo);
        // send the book data
        $scope.addRequest = false;
        search.addBook(bookData);  
    };
}]);