var chevApp = angular.module('chevApp', ['ngRoute']);

chevApp.config(['$routeProvider', '$locationProvider'	,function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'public/pages/home.html',
			controller: 'homeController'
		}).
		when('/ingredients', {
			templateUrl: 'public/pages/ingredients.html',
			controller: 'ingredientController'
		}).
		when('/howitwork', {
			templateUrl: 'public/pages/howitwork.html',
			controller: 'howitworkController'
		}).
		when('/login', {
			templateUrl: 'public/pages/login.html',
			controller: 'loginController'
		}).
		when('/signup', {
			templateUrl: 'public/pages/signup.html',
			controller: 'signupController'
		}).
		when('/products', {
			templateUrl: 'public/pages/products.html',
			controller: 'productsController'
		}).
		otherwise ({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
		// $locationProvider.html5Mode({
		// 	enabled: true
		// });
}]);

// Controller For NAVBAR
chevApp.controller('navbarController', function($scope, $location){
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});

// Controller for Homepage
chevApp.controller('homeController', function($scope, $rootScope){
	$rootScope.navbarClass = "";
	$(window).stellar();
	$.stellar({
	  horizontalScrolling: false
	});
});

// Controller for Ingredients Page
chevApp.controller('ingredientController', function($scope, $rootScope){
	$rootScope.navbarClass = "text-dark";
	$(window).stellar();
	$.stellar({
	  horizontalScrolling: false
	});

	$("#click1").click(function(event) {
		$("#read1").slideToggle("slow");
		$(this).text(function(i, text){
			return text === "More Info v" ? "Less ^" : "More Info v";
		})
	});

	$("#click2").click(function(event) {
		$("#read2").slideToggle("slow");
		$(this).text(function(i, text){
			return text === "More Info v" ? "Less ^" : "More Info v";
		})
	});

	$("#click3").click(function(event) {
		$("#read3").slideToggle("slow");
		$(this).text(function(i, text){
			return text === "More Info v" ? "Less ^" : "More Info v";
		})
	});

	$("#click4").click(function(event) {
		$("#read4").slideToggle("slow");
		$(this).text(function(i, text){
			return text === "More Info v" ? "Less ^" : "More Info v";
		})
	});
});

chevApp.controller('howitworkController', function($scope, $rootScope){
	$rootScope.navbarClass = "text-dark";
});

chevApp.controller('loginController', function($scope, $rootScope){
	$rootScope.navbarClass = "text-dark";
});

chevApp.controller('signupController', function($scope, $rootScope){
	$rootScope.navbarClass = "text-dark";
});

chevApp.controller('productsController', function($scope, $rootScope){
	$rootScope.navbarClass = "text-dark";
});