angular.module('BookDuckApp')
.controller('TradeController', ['$scope', 'books', function($scope, books) {
    $scope.loading = true;
    // GET A LIST OF ANY BOOKS THE USER REQUESTED
    books.myRequests().success(function(data) {
        $scope.loading = false;
        $scope.myRequests = data;
    });
    // FUNCTIONS TO DELETE BOOK
    $scope.requestDelete = function(id) {
        for (var i = 0; i < $scope.myRequests.length; i++) {
            if ($scope.myRequests[i].book_id == id) {
                $scope.myRequests[i].deleteRequest = true;
            }
        }
    };
    $scope.cancelDelete = function(id) {
        for (var i = 0; i < $scope.myRequests.length; i++) {
            if ($scope.myRequests[i].book_id == id) {
                $scope.myRequests[i].deleteRequest = false;
            }
        }
    };
    // delete book from my books
    $scope.deleteBook = function(bookID) {
        var deleteIndex =  function(index) {
            $scope.myRequests.splice(index, 1);
        };
        // send the book data to the back end
        books.deleteRequest(bookID).success(function(data){
            $scope.message = data.message;
            // remove the book
            for (var i = 0; i < $scope.myRequests.length; i++) {
                if ($scope.myRequests[i].book_id == bookID) {
                    $scope.myRequests[i].deleteRequest = false;
                    deleteIndex(i);
                }
            }
        });
    };
}]);