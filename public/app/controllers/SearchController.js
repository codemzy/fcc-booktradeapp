angular.module('BookDuckApp')
.controller('SearchController', ['$scope', 'search', function($scope, search) {
    // SEARCH FOR VENUES BASED ON LOCATION
    $scope.localSearch = function() {
        if ($scope.userLocation) {
            $scope.message = false;
            $scope.currentPage = 1;
            $scope.loading = true;
            search.getResults($scope.bookDetails).success(function(data) {
                $scope.bookResults = data;
                $scope.totalItems = data.total;
                $scope.loading = false;
            }).error(function(error) {
                $scope.loading = false;
                $scope.message = "There was no data found for this book.";
            });
        }
    }; 
}]);