angular.module('BookDuckApp')
.factory('search', ['$http', function($http) {
  this.bookSearch = function(searchTerm) {
    return $http.get('/api/book/search/' + searchTerm)
              .success(function(data) {
                return data;
              })
              .error(function(err) {
                return err;
              });
  };
  return this;
}]);