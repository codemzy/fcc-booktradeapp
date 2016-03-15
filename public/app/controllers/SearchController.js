angular.module('BookDuckApp')
.controller('SearchController', ['$scope', 'search', function($scope, search) {
    // SEARCH FOR VENUES BASED ON LOCATION
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
}]);