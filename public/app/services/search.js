angular.module('BookDuckApp')
.factory('search', ['$http', function($http) {
  this.booksOwned = function() {
    return $http.get('/api/user/books/ids')
              .success(function(data) {
                return data;
              })
              .error(function(err) {
                return err;
              });
  };
  this.bookSearch = function(searchTerm) {
    return $http.get('/api/book/search/' + searchTerm)
              .success(function(data) {
                return data;
              })
              .error(function(err) {
                return err;
              });
  };
  // add the poll data
  this.addBook = function(data) {
    return $http({
            method  : 'POST',
            url     : '/api/user/add/book',
            data    : data, 
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
              .success(function(data) {
                return data;
              })
              .error(function(data) {
                return data;
              });
  };
  return this;
}]);