var chevApp = angular.module('chevApp', ['ngRoute', 'ngResource']);

/*===========================================
=            Route in AngularJS            =
===========================================*/

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
		when('/logout', {
			templateUrl: 'public/pages/login.html',
			controller: 'logoutController'
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

/*====================================================
=            Controller for each of pages            =
====================================================*/

// Controller For NAVBAR
chevApp.controller('navbarController', function($scope, $location, $rootScope, $resource){
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    // Set up Chev Price Here
    $rootScope.chevPrice = 1000;

    $rootScope.toggleModal = function(){
    	var cart = window.localStorage['ChevCart'];
    	if(cart !== 'undefined' && cart !== undefined) {
    		$rootScope.cart = JSON.parse(cart);
    	} else {
    		$rootScope.cart = undefined;
    	}
		$rootScope.showModal = !$rootScope.showModal;


    };

    // Use for clear cart
    $rootScope.clearCart = function(){
    	localStorage.clear();
    	// console.log(window.localStorage['ChevCart']);
    	$rootScope.showModal = !$rootScope.showModal;
    };

    // Use for link to login page
    $rootScope.login = function(){
    	$location.path('/login');
    	$rootScope.showModal = !$rootScope.showModal;
    };

    isLogin($resource, $rootScope);
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

chevApp.controller('loginController', function($scope, $rootScope, $resource){
	$rootScope.navbarClass = "text-dark";
	
	isLogin($resource, $rootScope);

	var Login = $resource('public/login', {}, {'login' : {method:'POST'}});
	$scope.login = function() {
		var feedback = Login.login($scope.form, function(val){
			showMessage($scope, "เข้าสู่ระบบสำเร็จ", "alertSuccess", ".alertBox", 5000);
			$rootScope.isLogin = true;
			$rootScope.userInfo = val['user'];
			// console.log(val);
		}, function(res){
			showMessage($scope, "เกิดข้อผิดพลาด อาจเกิดจากเมล์หรือรหัสผ่านผิด", "alertFailed", ".alertBox", 20000);
		});
		// console.log(feedback);
	}

});

chevApp.controller('signupController', function($scope, $rootScope, Users){
	$rootScope.navbarClass = "text-dark";
	$scope.genders = [
		{title: "Male", val: 100},
		{title: "Female", val: 0}
	];
	$scope.form = {};
	$scope.form.gender = $scope.genders[0];

	$scope.signup = function() {
		// var SignUp = $resource('public/user');
		// var feedback = SignUp.post()
		if($scope.form.password != $scope.form.confirm_password){
			showMessage($scope, "รหัสผ่านไม่ตรงกัน", "alertFailed", ".alertBox", 10000);
		}
		else {
			var genderTemp = $scope.form.gender;
			$scope.form.gender = $scope.form.gender['val'];
			console.log($scope.form.gender);
			var feedback = Users.store($scope.form, function(val){
				showMessage($scope, "สมัครสมาชิกเสร็จสิ้น", "alertSuccess", ".alertBox", 10000);
				$rootScope.isLogin = true;
				$rootScope.userInfo = val['user'];
			}, function(res){
				var errorList = JSON.parse(res['data']['error']['message']);
				errorList = errorList['messages'];

				var errorMsg = "<u style='text-align:center;'>เกิดข้อผิดพลาด</u> <br /> ";
				for (var i = 0; i < errorList.length; i++) {
					if(errorList[i] === "email_missing")
						errorMsg += "- ไม่ได้เติมอีเมล์ <br />";
					else if(errorList[i] === "password_missing")
						errorMsg += "- ไม่ได้เติมรหัสผ่าน <br />";
					else if(errorList[i] === "tel_missing")
						errorMsg += "- ไม่ได้เติมเบอร์โทรศัพท์ <br />";
					else if(errorList[i] === "name_first_missing")
						errorMsg += "- ไม่ได้เติมชื่อ <br />";
					else if(errorList[i] === "name_last_missing")
						errorMsg += "- ไม่ได้เติมนามสกุล <br />";
					else if(errorList[i] === "password_length")
						errorMsg += "- ความยาวรหัสผ่านไม่ครบ <br />";
					else if(errorList[i] === "email_length")
						errorMsg += "- ความยาวอีเมล์ไม่ครบ <br />";
					else if(errorList[i] === "email_found")
						errorMsg += "- อีเมล์นี้ได้ใช้ไปแล้ว <br />";
					else if(errorList[i] === "tel_length")
						errorMsg += "- ความยาวเบอร์โทรศัพท์ไม่ครบ <br />";
					else if(errorList[i] === "tel_length")
						errorMsg += "- ความยาวเบอร์โทรศัพท์ไม่ครบ <br />";

				};
				showMessage($scope, errorMsg, "alertFailed", ".alertBox", 10000);
				$scope.form.gender = genderTemp;
			});
			// console.log(feedback); 
		}
		

	}
});

chevApp.controller('productsController', function($scope, $rootScope){
	$rootScope.navbarClass = "text-dark";
	$scope.addToCart = function(){
		if($scope.amount === undefined)
			showMessage($scope, "กรุณาระบุจำนวนสินค้า", "alertFailed", ".alertBox");
		else {
			var cart = window.localStorage['ChevCart'];
			if(cart === undefined || cart === 'undefined') {
				cart = {Chev: {amount:$scope.amount}};
			} else {
				cart = JSON.parse(cart);
				cart["Chev"]["amount"] += $scope.amount;
			}
			window.localStorage['ChevCart'] = JSON.stringify(cart);
			showMessage($scope, "นำสินค้าใส่ตะกร้าเรียบร้อยจำนวน " + $scope.amount + " ชิ้น", "alertSuccess", ".alertBox");			
			$scope.amount = 1;
		}	
	};
});


chevApp.controller('logoutController', function($scope, $rootScope, $location, $resource){
	var Logout = $resource('public/logout', {},  {'logout': { method: 'GET', isArray:true}});

		// console.log(hello);
	Logout.logout(function(val){
		$location.path('/home');
		$rootScope.isLogin = false;
		$rootScope.userInfo = null;
	});
});

/*========================================
=            General Function            =
========================================*/

showMessage = function($scope, message, style, element, time)
{
	$scope.alert = {};
	var alertBox = $scope.alert;
	alertBox.message = message;
	alertBox.style = style;
	time = typeof time !== 'undefined'? time : 1500; 
	$(element).fadeIn('400', function() {
		$(element).delay(time).fadeOut('slow');
	});

};

isLogin = function($resource, $rootScope)
{
	var isLogin = $resource('public/is-login', null);	
	isLogin.get({}, function(val){
		$rootScope.isLogin = true;
		$rootScope.userInfo = val['user'];
	}, function(res){
		$rootScope.isLogin = false;
	});
};

/*=====================================================
=            Angular Directive (Component)            =
=====================================================*/

// AlerBox Component
chevApp.directive('alertBox', function()
{
	return {
		restrict: 'AE',
		scope: true,
		template: '<div class="{{alert.style}}"><span ng-bind-html="alert.message | unsafe"></span></div>',

	};
});

// Modal Component
chevApp.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });

chevApp.filter('unsafe', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
}]);

/*====================================
=            User Factory            =
====================================*/

chevApp.factory('User', function($resource){
	return $resource('public/user/:user_id', 
		{}, 
		{
			show: {method:'GET'},
		 	update: {method: 'PUT', params:{id: '@user_id'}},
		 	delete: {method: 'DELETE', params:{id: '@user_id'}}
		});
});

chevApp.factory('Users', function($resource){
	return $resource('public/user', 
		{}, 
		{
			index: {method:'GET'},
		 	store: {method: 'POST'}
		});
});


