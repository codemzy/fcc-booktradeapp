angular.module('BookDuckApp', ['ngRoute'])

// app routes
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
    templateUrl: '/public/app/views/home.html'
    })
    // logged in routes
    .when('/profile', {
    templateUrl: '/public/app/views/user_profile.html',
    controller: 'ProfileController'
    })
    .when('/addbooks', {
    templateUrl: '/public/app/views/user_search.html',
    controller: 'SearchController'
    })
    // default
    .otherwise({ 
      redirectTo: '/' 
    }); 

});