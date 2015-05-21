var chevApp = angular.module('chevApp', [ 'ui.router', 'ngResource', 'ui.bootstrap']);

chevApp.run(function($rootScope, $location, $resource){

	var routesThatRequireAuth = ['/user'];

	var routeDirty = function(route) {
		return _.find(routesThatRequireAuth, 
			function(authRoute){
				return route.startsWith(authRoute);
			});
	};

	$rootScope.$on('$routeChangeStart', function(event, next, current){
		if(routeDirty($location.url()))
		{
			var isLogin = $resource('public/is-login', null);	
			isLogin.get({}, function(val){
				$rootScope.isLogin = true;
				$rootScope.userInfo = val['user'];
			}, function(res){
				$rootScope.isLogin = false;
				$location.path('/login');
			});
		}
	});
});

var user_csrf;

/*===========================================
=            Route in AngularJS            =
===========================================*/

chevApp.config(['$locationProvider', '$stateProvider', '$urlRouterProvider'	,function($locationProvider,$stateProvider,  $urlRouterProvider) {
	$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'public/pages/home.html',
			controller: 'homeController'
		}).
		state('successStory', {
			url: '/successStory',
			templateUrl: 'public/pages/successStory.html',
			controller: 'successStoryController'
		}).
		state('ingredients', {
			url: '/ingredients',
			templateUrl: 'public/pages/ingredients.html',
			controller: 'ingredientController'
		}).
		state('howitwork', {
			url: '/howitwork',
			templateUrl: 'public/pages/howitwork.html',
			controller: 'howitworkController'
		}).
		state('secret', {
			url: '/secret',
			templateUrl: 'public/pages/secret.html',
			controller: 'secretController'
		}).
		state('login', {
			url: '/login',
			templateUrl: 'public/pages/login.html',
			controller: 'loginController'
		}).
		state('logout', {
			url: '/logout',
			templateUrl: 'public/pages/login.html',
			controller: 'logoutController'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'public/pages/signup.html',
			controller: 'signupController'
		}).
		state('products', {
			url: '/products',
			templateUrl: 'public/pages/products.html',
			controller: 'productsController'
		}).
		state('checkout', {
			url: '/checkout',
			templateUrl: 'public/pages/checkout.html',
			controller: 'checkoutController'
		}).
		state('chooseAdd', {
			url: '/chooseAdd',
			templateUrl: 'public/pages/chooseAdd.html',
			controller: 'chooseAddController'
		}).
		state('howToTransfer', {
			url: '/howToTransfer',
			templateUrl: 'public/pages/howtotransfer.html',
			controller: 'howToTransferController'
		}).
		state('user', {
			url: '/user',
			templateUrl: 'public/pages/user.html',
			controller: 'userController'
		}).
		state('admin', {
			url: '/admin',
			templateUrl: 'public/pages/admin.html',
			controller: 'adminController'
		}).
		state('admin.orders', {
			url: '/orders',
			templateUrl: 'public/pages/admin.orders.html',
			controller: 'adminOrderController'
		}).
		state('admin.transfered', {
			url: '/transfered',
			templateUrl: 'public/pages/admin.transfered.html',
			controller: 'adminTransferedController'
		}).
		state('admin.shipped', {
			url: '/shipped',
			templateUrl: 'public/pages/admin.shipped.html',
			controller: 'adminShippedController'
		}).
		state('orders', {
			url: '/orders',
			templateUrl: 'public/pages/orders.html',
			controller: 'ordersController'
		});
		// state('/user/:tab', {
		// 	templateUrl: 'public/pages/user.html',
		// 	controller: 'userMenuController'
		// }).
		$urlRouterProvider.otherwise('/');

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
chevApp.controller('navbarController', function($scope, $location, $rootScope, $resource, Cart){
	$scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    // Set up Chev Price Here
    $rootScope.chevPrice = 1000;

 //    $('.nav a').on('click', function(){
	//     // $(".btn-navbar").click(); //bootstrap 2.x
	//     // $(".navbar-toggle").click() //bootstrap 3.x by Richard
	//     $(".navbar-collapse").collapse('hide');
	// });

    $rootScope.viewCart = function(){
    	var getCart = Cart.index(function(){
    		if(getCart["total"] == 0) {
    			$rootScope.cart = undefined;
    		} else {    		
    			$rootScope.cart = getCart["products"];
    		}
    		
    	});
    	// var cart = window.localStorage['ChevCart'];
    	// if(cart !== 'undefined' && cart !== undefined) {
    	// 	$rootScope.cart = JSON.parse(cart);
    	// } else {
    	// 	$rootScope.cart = undefined;
    	// }
		// $rootScope.showModal = !$rootScope.showModal;


    };

    $rootScope.showCart = function(){
    	var getCart = Cart.index(function(){
    		if(getCart["total"] == 0) {
    			$rootScope.cart = undefined;
    		} else {    		
    			$rootScope.cart = getCart["products"];
    			$('.dropdown-menu').dropdown('toggle');
    		}
    		
    	});
    };

    $rootScope.deleteItem = function(product_id){
    	console.log(product_id);

    	$resource('public/cart/' + product_id).delete(function(){
    		$rootScope.showCart();
    	});

    };

    // Use for clear cart
    $rootScope.clearCart = function(){
    	localStorage.clear();
    	$rootScope.cart = undefined;
    	// console.log(window.localStorage['ChevCart']);
    	// $rootScope.showModal = !$rootScope.showModal;
    };

    // Use for link to login page
    $rootScope.login = function(){
    	$location.path('/login');
    	// $rootScope.showModal = !$rootScope.showModal;
    };

    $rootScope.checkout = function(){
    	$location.path('/checkout');
    };

    isLogin($resource, $rootScope);
});

// Controller for Homepage
chevApp.controller('homeController', function($scope, $rootScope){
	$rootScope.navbarClass = "text-dark";
	$(window).stellar();
	$.stellar({
	  horizontalScrolling: false
	});

	$scope.myInterval = 3000;
	$scope.myInterval1 = 3000;

	$scope.slides = [
	    {
	      image: 'public/img/ban1.png'
	    },
	    {
	      image: 'public/img/ban2.png'
	    },
	    {
	      image: 'public/img/ban3.png'
	    }
	 ];

	 $scope.slides1 = [
	    {
	      image: 'public/img/NEW_BANNER1_MOBILE.png'
	    },
	    {
	      image: 'public/img/NEW_BANNER2_MOBILE.png'
	    },
	    {
	      image: 'public/img/NEW_BANNER3_MOBILE.png'
	    }
	 ];
});

// Controller for Ingredients Page
chevApp.controller('ingredientController', function($scope, $rootScope){
	$rootScope.navbarClass = "text-dark";
	// $(window).stellar();
	// $.stellar({
	//   horizontalScrolling: false
	// });

	// $("#click1").click(function(event) {
	// 	$("#read1").slideToggle("slow");
	// 	$(this).text(function(i, text){
	// 		return text === "More Info v" ? "Less ^" : "More Info v";
	// 	})
	// });

	// $("#click2").click(function(event) {
	// 	$("#read2").slideToggle("slow");
	// 	$(this).text(function(i, text){
	// 		return text === "More Info v" ? "Less ^" : "More Info v";
	// 	})
	// });

	// $("#click3").click(function(event) {
	// 	$("#read3").slideToggle("slow");
	// 	$(this).text(function(i, text){
	// 		return text === "More Info v" ? "Less ^" : "More Info v";
	// 	})
	// });

	// $("#click4").click(function(event) {
	// 	$("#read4").slideToggle("slow");
	// 	$(this).text(function(i, text){
	// 		return text === "More Info v" ? "Less ^" : "More Info v";
	// 	})
	// });

	// var data = {
	//     labels: ["1000 mg of L-carnitine/day", "1000 mg of other low calorie diet group/day"],
	//     datasets: [
	//         {
	//             label: "My First dataset",
	//             fillColor: "rgba(220,220,220,0.5)",
	//             strokeColor: "rgba(220,220,220,0.8)",
	//             highlightFill: "rgba(220,220,220,0.75)",
	//             highlightStroke: "rgba(220,220,220,1)",
	//             data: [3, 1]
	//         },
	//         {
	//             label: "My Second dataset",
	//             fillColor: "rgba(151,187,205,0.5)",
	//             strokeColor: "rgba(151,187,205,0.8)",
	//             highlightFill: "rgba(151,187,205,0.75)",
	//             highlightStroke: "rgba(151,187,205,1)",
	//             data: [5, 2]
	//         }
	//     ]
	// };

	// var options = {
	//     //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	//     scaleBeginAtZero : true,

	//     //Boolean - Whether grid lines are shown across the chart
	//     scaleShowGridLines : true,

	//     //String - Colour of the grid lines
	//     scaleGridLineColor : "rgba(0,0,0,.05)",

	//     //Number - Width of the grid lines
	//     scaleGridLineWidth : 1,

	//     //Boolean - Whether to show horizontal lines (except X axis)
	//     scaleShowHorizontalLines: true,

	//     //Boolean - Whether to show vertical lines (except Y axis)
	//     scaleShowVerticalLines: true,

	//     //Boolean - If there is a stroke on each bar
	//     barShowStroke : true,

	//     //Number - Pixel width of the bar stroke
	//     barStrokeWidth : 2,

	//     //Number - Spacing between each of the X value sets
	//     barValueSpacing : 5,

	//     //Number - Spacing between data sets within X values
	//     barDatasetSpacing : 1,

	//     responsive: true, 

	//     maintainAspectRatio: true,

	//     //String - A legend template
	//     legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	// };

	var inView = false;

	// function isScrolledIntoView(elem)
	// {
	//     var docViewTop = $(window).scrollTop();
	//     var docViewBottom = docViewTop + $(window).height();

	//     var elemTop = $(elem).offset().top;
	//     var elemBottom = elemTop + $(elem).height();

	//     return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
	// }

	// $(window).scroll(function() {
	//     if (isScrolledIntoView('#chart1')) {
	//         if (inView) { return; }
	//         inView = true;
	//         setTimeout(function(){
	        	
	//         }, 1000);
	        
	//     } else {
	//         inView = false;  
	//     }
	// });

	new Chartist.Bar('#chart1', {
	  labels: ['1000 mg of L-canitine', '1000mg of other'],
	  series: [
	    [3, 1],
	    [5, 2]
	  ]
	}, {
	  seriesBarDistance: 12,
	  stackBars: true,
	  axisY: {
	    labelInterpolationFnc: function(value) {
	      return (value) + '';
	    }
	  }
	}).on('draw', function(data) {
	  if(data.type === 'bar') {
	    data.element.attr({
	      style: 'stroke-width: 30px'
	    });
	  }
	});
	// var ctx = document.getElementById("firstChart").getContext("2d");
	// var myBarChart = new Chart(ctx).StackedBar(data, options);



	


});

chevApp.controller('successStoryController', function($scope, $rootScope){
	$rootScope.navbarClass = "text-dark";
});

chevApp.controller('secretController', function($scope, $rootScope){
	$rootScope.navbarClass = "text-dark";
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

			$rootScope.user_csrf = val["csrf_token"];
			// console.log(user_csrf);
		}, function(res){
			// showMessage($scope, "เกิดข้อผิดพลาด อาจเกิดจากเมล์หรือรหัสผ่านผิด", "alertFailed", ".alertBox", 20000);
			// var errorList = JSON.parse(res['data']['error']['message']);
			// errorList = errorList['messages'];
			$scope.valid = {};
			$scope.valid.password = "ชื่อผู้ใช้หรือรหัสผ่านผิด";

			
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
	$scope.valid = {};

	$scope.signup = function() {
		// var SignUp = $resource('public/user');
		// var feedback = SignUp.post()
		if($scope.form.password != $scope.form.confirm_password){
			showMessage($scope, "รหัสผ่านไม่ตรงกัน", "alertFailed", ".alertBox", 10000);
		}
		else {
			var genderTemp = $scope.form.gender;
			$scope.form.gender = $scope.form.gender['val'];
			$scope.form._token = $rootScope.user_csrf;
			console.log($scope.form.gender);
			var feedback = Users.store($scope.form, function(val){
				showMessage($scope, "สมัครสมาชิกเสร็จสิ้น", "alertSuccess", ".alertBox", 10000);
				$rootScope.isLogin = true;
				$rootScope.userInfo = val['user'];
			}, function(res){
				var errorList = JSON.parse(res['data']['error']['message']);
				errorList = errorList['messages'];
				$scope.valid = {};

				var errorMsg = "<u style='text-align:center;'>เกิดข้อผิดพลาด</u> <br /> ";
				for (var i = 0; i < errorList.length; i++) {
					if(errorList[i] === "email_missing")
						$scope.valid.email = "ไม่ได้เติมอีเมล์";
					else if(errorList[i] === "password_missing")
						$scope.valid.password = "ไม่ได้เติมรหัสผ่าน";
					else if(errorList[i] === "tel_missing")
						$scope.valid.tel = "ไม่ได้เติมเบอร์โทรศัพท์";
					else if(errorList[i] === "name_first_missing")
						$scope.valid.name_first = "ไม่ได้เติมชื่อ";
					else if(errorList[i] === "name_last_missing")
						$scope.valid.name_last = "ไม่ได้เติมนามสกุล";
					else if(errorList[i] === "password_length")
						$scope.valid.password = "ความยาวรหัสผ่านไม่ครบ";
					else if(errorList[i] === "email_length")
						$scope.valid.email = "ความยาวอีเมล์ไม่ครบ";
					else if(errorList[i] === "email_found")
						$scope.valid.email = "อีเมล์นี้ได้ใช้ไปแล้ว";
					else if(errorList[i] === "tel_length")
						$scope.valid.tel = "ความยาวเบอร์โทรศัพท์ไม่ครบ";

				};
				// showMessage($scope, errorMsg, "alertFailed", ".alertBox", 10000);
				$scope.form.gender = genderTemp;
			});
			// console.log(feedback); 
		}
		

	}
});

chevApp.controller('productsController', function($scope, $rootScope, $resource, Cart){
	$rootScope.navbarClass = "text-dark";
	$scope.amount1 = 1;
	$scope.amount2 = 1;
	$scope.addToCart = function(product_id){
		// if($scope.amount === undefined)
		// 	showMessage($scope, "กรุณาระบุจำนวนสินค้า", "alertFailed", ".alertBox");
		// else {
		// 	var cart = window.localStorage['ChevCart'];
		// 	if(cart === undefined || cart === 'undefined') {
		// 		cart = {Chev: {amount:$scope.amount}};
		// 	} else {
		// 		cart = JSON.parse(cart);
		// 		cart["Chev"]["amount"] += $scope.amount;
		// 	}
		// 	window.localStorage['ChevCart'] = JSON.stringify(cart);
		// 	showMessage($scope, "นำสินค้าใส่ตะกร้าเรียบร้อยจำนวน " + $scope.amount + " ชิ้น", "alertSuccess", ".alertBox");			
		// 	$scope.amount = 1;
		// }	
		// console.log(product_id);
		var addedItem = {};
		addedItem['product_id'] = product_id;
		addedItem['product_amount'] = $scope["amount" + product_id] ;
		$scope["amount" + product_id] = 1;
		// console.log("PID " + product_id);
		// console.log($scope);
		// console.log(addedItem);
		// console.log(addedItem);
		Cart.store(addedItem, function(){
			$rootScope.showCart();
			// sc();
		});

		showMessage($scope, "นำสินค้าใส่ตะกร้าเรียบร้อยจำนวน " + $scope.amount + " ชิ้น", "alertSuccess", ".alertBox");	
	};
});


chevApp.controller('logoutController', function($scope, $rootScope, $location, $resource){
	isLogin($resource, $rootScope);
	var Logout = $resource('public/logout', {'_token': $rootScope.user_csrf},  {'logout': { method: 'GET', isArray:true}});
	// console.log($rootScope.user_csrf);
		// console.log(hello);
	Logout.logout(function(val){
		$location.path('/home');
		$rootScope.isLogin = false;
		$rootScope.userInfo = null;
	});
});

/*=======================================
=            User Controller            =
=======================================*/

chevApp.controller('userController', function($scope, $rootScope, $location, $resource, User, AddUserAddress, UserAddress, UserAddress){
	$rootScope.navbarClass = "text-dark";

	var user = User;
	// $scope.userInfoEdit = "absolute zeroOpacity";

	$scope.editUserInfo = function(){
		// $scope.userInfoShow = "animated zoomOut absolute";
		// $scope.userInfoEdit = "animated zoomIn";
		$scope.userInfoView = true;
		$scope.updateData = $rootScope.userInfo;
		$scope.valid = {};
	}

	$scope.updateInfo = function(){
		// $rootScope.userInfo["name_first"] = "สมุหสมาคมนิยมไทย";
		$rootScope.userInfo = $scope.updateData;
		// console.log($rootScope.userInfo);
		User.update({user_id:$rootScope.userInfo["id"]}, $rootScope.userInfo, function(res){
			$("#editUserInfo").modal('hide');
		}, function(res){
			var errorList = JSON.parse(res['data']['error']['message']);
			errorList = errorList['messages'];
			
			$scope.valid = {};

			for (var i = 0; i < errorList.length; i++) {
				if(errorList[i] === "tel_missing")
					$scope.valid.tel = "กรุณาใส่เบอร์โทรศัพท์";
				else if(errorList[i] === "tel_length")
					$scope.valid.tel = "เบอร์โทรศัพท์ไม่ครบ";
				else if(errorList[i] === "name_first_missing")
					$scope.valid.name_first = "กรุณาใส่ชื่อ";
				else if(errorList[i] === "name_last_missing")
					$scope.valid.name_last = "กรุณาใส่นามสกุล";
				else if(errorList[i] === "name_found"){
					$scope.valid.name_first = "ชื่อและนามสกุลนี้ได้ถูกใช้ไปแล้ว";	
					$scope.valid.name_last = "ชื่อและนามสกุลนี้ได้ถูกใช้ไปแล้ว";	
				}


				
			};
		});
		// $scope.userInfoEdit = "animated zoomOut absolute";
		// $scope.userInfoShow = "animated zoomIn";
		// $scope.userInfoView = false;
	};

	$scope.newAddressDlg = function(){
		$scope.newAddressEnabled = true;
		$scope.newAddressClass = "bounceIn";
	};

	$scope.submitAddress = function(isEdit){	
		// console.log($scope.newAddress);
		// $scope.newAddress["house_name"]	= ($scope.newAddress["house_name"] == null)? '':$scope.newAddress["house_name"];
		// $scope.newAddress["road"]	= ($scope.newAddress["road"] == null)? '':$scope.newAddress["road"];
		// AddUserAddress.store($scope.newAddress);
		
		// $scope.newAddressEnabled = false;
		// $scope.newAddressClass = "bounceOut";
		var address = $scope.newAddress;
		// address._token = $rootScope.user_csrf;
		if(isEdit == true){
			$scope.newAddress._token = $rootScope.user_csrf;
			UserAddress.update({add_id:$scope.newAddress["id"]}, $scope.newAddress, function(res){
    			isLogin($resource, $rootScope);
				$("#editAddress").modal('hide');
			}, function(res){
					var errorList = JSON.parse(res['data']['error']['message']);
					errorList = errorList['messages'];
					
					$scope.valid = {};

					for (var i = 0; i < errorList.length; i++) {
						if(errorList[i] === "title_missing")
							$scope.valid.title = "กรุณาใส่ชื่อผู้รับ";
						else if(errorList[i] === "house_missing")
							$scope.valid.house = "กรุณาใส่บ้านเลขที่";
						else if(errorList[i] === "district_missing")
							$scope.valid.district = "กรุณาใส่ตำบล";
						else if(errorList[i] === "county_missing")
							$scope.valid.county = "กรุณาใส่อำเภอ";
						else if(errorList[i] === "province_missing")
							$scope.valid.province = "กรุณาใส่จังหวัด";
						else if(errorList[i] === "postcode_missing")
							$scope.valid.postcode = "กรุณาใส่รหัสไปรษณีย์";


						
					};
			});
		} else {
			$scope.newAddress._token = $rootScope.user_csrf;
			$scope.newAddress["house_name"]	= ($scope.newAddress["house_name"] == null)? '':$scope.newAddress["house_name"];
			$scope.newAddress["road"]	= ($scope.newAddress["road"] == null)? '':$scope.newAddress["road"];
			AddUserAddress.store($scope.newAddress, function(res){
    			isLogin($resource, $rootScope);
				$("#editAddress").modal('hide');
			}, function(res){
					var errorList = JSON.parse(res['data']['error']['message']);
					errorList = errorList['messages'];
					
					$scope.valid = {};

					for (var i = 0; i < errorList.length; i++) {
						if(errorList[i] === "title_missing")
							$scope.valid.title = "กรุณาใส่ชื่อผู้รับ";
						else if(errorList[i] === "house_missing")
							$scope.valid.house = "กรุณาใส่บ้านเลขที่";
						else if(errorList[i] === "district_missing")
							$scope.valid.district = "กรุณาใส่ตำบล";
						else if(errorList[i] === "county_missing")
							$scope.valid.county = "กรุณาใส่อำเภอ";
						else if(errorList[i] === "province_missing")
							$scope.valid.province = "กรุณาใส่จังหวัด";
						else if(errorList[i] === "postcode_missing")
							$scope.valid.postcode = "กรุณาใส่รหัสไปรษณีย์";


						
					};
			});
			
			$scope.newAddressEnabled = false;
			$scope.newAddressClass = "bounceOut";
		}
		console.log(isEdit);
	};

	$scope.setDefaultAddress = function(num){

		$rootScope.userInfo["default_address_id"] = num;
		User.update({user_id:$rootScope.userInfo["id"]}, $rootScope.userInfo);
	}

	$scope.isDefault = function(num){
		return $rootScope.userInfo["default_address_id"] === num;
	}


	$scope.callAddressBox = function(addId, isEdit){
		// console.log(addId);
		$scope.valid = {};
		if(isEdit == true){
			$scope.addressBoxTitle = "แก้ไขที่อยู่";
			$scope.newAddress = $rootScope.userInfo["addresses"][addId];
			$scope.newAddress['isEdit'] = true;
		} else {
			$scope.addressBoxTitle = "เพิ่มที่อยู่ใหม่";
			$scope.newAddress = {};
			$scope.newAddress['isEdit'] = false;
		}
	};

	// console.log($rootScope.userInfo);
	// $scope.pages = {processPurchase:'public/pages/user/processPurchase.html'}
});

// chevApp.controller('userMenuController', function($scope, $rootScope, $location, $routeParams){
// 	$scope.tab = $routeParams['tab'];
// 	console.log($scope.tab);
// })

/*===========================================
=            CheckOut Controller            =
===========================================*/

chevApp.controller('checkoutController', function($scope, $rootScope, $location,  Cart){
	$rootScope.navbarClass = "text-dark";

	var getCart = Cart.index(function(){
		if(getCart["total"] == 0) {
			$rootScope.cart = undefined;
		} else {    		
			$rootScope.cart = getCart["products"];
		}
		
	});
});

/*================================================
=            ChooseAddress Controller            =
================================================*/

chevApp.controller('chooseAddController', function($scope, $rootScope, $location,  Cart, User, UserAddress, AddUserAddress, $resource, Order){
	$rootScope.navbarClass = "text-dark";

	
	isLogin($resource, $rootScope, function(){
		$scope.currentAddress = $rootScope.userInfo["default_address_id"];
	});

	$scope.submitAddress = function(isEdit){	
		// console.log($scope.newAddress);
		// $scope.newAddress["house_name"]	= ($scope.newAddress["house_name"] == null)? '':$scope.newAddress["house_name"];
		// $scope.newAddress["road"]	= ($scope.newAddress["road"] == null)? '':$scope.newAddress["road"];
		// AddUserAddress.store($scope.newAddress);
		
		// $scope.newAddressEnabled = false;
		// $scope.newAddressClass = "bounceOut";
		if(isEdit == true){
			$scope.newAddress._token = $rootScope.user_csrf;
			UserAddress.update({add_id:$scope.newAddress["id"]}, $scope.newAddress, function(res){
    			isLogin($resource, $rootScope);
				$("#editAddress").modal('hide');
			}, function(res){
					var errorList = JSON.parse(res['data']['error']['message']);
					errorList = errorList['messages'];
					
					$scope.valid = {};

					for (var i = 0; i < errorList.length; i++) {
						if(errorList[i] === "title_missing")
							$scope.valid.title = "กรุณาใส่ชื่อผู้รับ";
						else if(errorList[i] === "house_missing")
							$scope.valid.house = "กรุณาใส่บ้านเลขที่";
						else if(errorList[i] === "district_missing")
							$scope.valid.district = "กรุณาใส่ตำบล";
						else if(errorList[i] === "county_missing")
							$scope.valid.county = "กรุณาใส่อำเภอ";
						else if(errorList[i] === "province_missing")
							$scope.valid.province = "กรุณาใส่จังหวัด";
						else if(errorList[i] === "postcode_missing")
							$scope.valid.postcode = "กรุณาใส่รหัสไปรษณีย์";


						
					};
			});
		} else {
			$scope.newAddress._token = $rootScope.user_csrf;
			$scope.newAddress["house_name"]	= ($scope.newAddress["house_name"] == null)? '':$scope.newAddress["house_name"];
			$scope.newAddress["road"]	= ($scope.newAddress["road"] == null)? '':$scope.newAddress["road"];
			AddUserAddress.store($scope.newAddress, function(res){
    			isLogin($resource, $rootScope);
				$("#editAddress").modal('hide');
			}, function(res){
					var errorList = JSON.parse(res['data']['error']['message']);
					errorList = errorList['messages'];
					
					$scope.valid = {};

					for (var i = 0; i < errorList.length; i++) {
						if(errorList[i] === "title_missing")
							$scope.valid.title = "กรุณาใส่ชื่อผู้รับ";
						else if(errorList[i] === "house_missing")
							$scope.valid.house = "กรุณาใส่บ้านเลขที่";
						else if(errorList[i] === "district_missing")
							$scope.valid.district = "กรุณาใส่ตำบล";
						else if(errorList[i] === "county_missing")
							$scope.valid.county = "กรุณาใส่อำเภอ";
						else if(errorList[i] === "province_missing")
							$scope.valid.province = "กรุณาใส่จังหวัด";
						else if(errorList[i] === "postcode_missing")
							$scope.valid.postcode = "กรุณาใส่รหัสไปรษณีย์";


						
					};
			});
			
			$scope.newAddressEnabled = false;
			$scope.newAddressClass = "bounceOut";
		}
		console.log(isEdit);
	};

	$scope.setCurrentAddress = function(num){

		$scope.currentAddress = num;
	}

	$scope.isDefault = function(num){
		return num === $scope.currentAddress;
	}


	$scope.callAddressBox = function(addId, isEdit){
		// console.log(addId);
		$scope.valid = {};
		if(isEdit == true){
			$scope.addressBoxTitle = "แก้ไขที่อยู่";
			$scope.newAddress = $rootScope.userInfo["addresses"][addId];
			$scope.newAddress['isEdit'] = true;
		} else {
			$scope.addressBoxTitle = "เพิ่มที่อยู่ใหม่";
			$scope.newAddress = {};
			$scope.newAddress['isEdit'] = false;
		}
	};


	$scope.submitOrder = function(){
		var add = {};
		add["address_id"] = $scope.currentAddress;
		add["_token"] = $rootScope.user_csrf;
		Order.store(add, function(){
			$location.path('howToTransfer');
		});
	};
});

/*================================================
=            HowToTransfer Controller            =
================================================*/

chevApp.controller('howToTransferController', function($scope, $rootScope ){
	$rootScope.navbarClass = "text-dark";
	
});

/*=========================================
=            Orders Controller            =
=========================================*/

chevApp.controller('ordersController', function($scope, $rootScope, Orders, $resource){
	$rootScope.navbarClass = "text-dark";
	var orders;
	isLogin($resource, $rootScope, function(){
		orders = Orders.get({temp_id: 1, '_token': $rootScope.user_csrf}, function(){
			$scope.orders = orders;
			// console.log(orders);
		});
	});
	$scope.valid = {};
	
	

	$scope.toggleOrderInfo = function(num){
		$scope.currentOrder = orders[num];
	};

	// $scope.updateTransfer = function(){
	// 	console.log($scope.transfer);
	// };
	
	// $("#dtBox").DateTimePicker();
	var currentTransfer = -1;
	$scope.setTransferItem = function(num){

		// console.log($rootScope.user_csrf);
		currentTransfer = num;
		$scope.valid = {};
		$scope.transfer = {};
		$scope.transfer.bank = 'ธนาคารกสิกรไทย';
	};

	$scope.setCancelItem = function(num){
		currentTransfer = num;
		$scope.valid = {};
		$scope.transfer = {};
		$scope.transfer.bank = 'ธนาคารกสิกรไทย';
	};

	$scope.cancelTransfer = function(){
		$scope.transfer.status = 0;
		$scope.transfer._token = $rootScope.user_csrf;

		Orders.update({temp_id: currentTransfer}, $scope.transfer, function(res){
			$("#cancelConfirm").modal('hide');
			var orders = Orders.get({temp_id: 1, '_token': $rootScope.user_csrf}, function(){
				$scope.orders = orders;
				// console.log(orders);
			});
		});
	}

	$scope.updateTransfer = function(){

		$scope.transfer.status = 1;
		$scope.transfer._token = $rootScope.user_csrf;

		if($scope.transfer.date_before !== undefined && $scope.transfer.time_before !== undefined){
			var month = $scope.transfer.date_before.getMonth()+1;
			var day = $scope.transfer.date_before.getDate();
			var year = $scope.transfer.date_before.getFullYear();

			var hour = $scope.transfer.time_before.getHours();
			if (hour < 10)
			    hour = "0"+hour;

			var min = $scope.transfer.time_before.getMinutes();
			if (min < 10)
			    min = "0"+min;

			var sec = $scope.transfer.time_before.getSeconds();
			if (sec < 10)
			    sec = "0"+sec;
			var dateTimeString = month+'/'+day+'/'+year+' '+hour+':'+min+':'+sec;
			$scope.transfer.time = new Date(dateTimeString);
		}
		
		// $scope.transfer.time = $scope.transfer.date + " " + $scope.transfer.time + ":00";
		Orders.update({temp_id: currentTransfer}, $scope.transfer, function(res){
			$("#transferConfirm").modal('hide');
			var orders = Orders.get({temp_id: 1, '_token': $rootScope.user_csrf}, function(){
				$scope.orders = orders;
				// console.log(orders);
			});
		}, function(res){
				var errorList = JSON.parse(res['data']['error']['message']);
				errorList = errorList['messages'];
				
				$scope.valid = {};

				for (var i = 0; i < errorList.length; i++) {
					if(errorList[i] === "amount_missing")
						$scope.valid.amount = "กรุณาใส่จำนวนเงิน";
					else if(errorList[i] === "payTime_missing")
						$scope.valid.payTime = "กรุณาใส่เวลาให้ถูกต้อง";
					
				};
		});	


		
		// console.log($scope.transfer);
	};
         
});

/*========================================
=            Admin Controller            =
========================================*/

chevApp.controller('adminController', function($scope, $rootScope, Order){
	$rootScope.navbarClass = "text-dark";
	// $rootScope.allOrders = Order.index(function(res){
	// 	console.log($rootScope.allOrders);
	// });
});

/*==============================================
=            Admin-Order Controller            =
==============================================*/

chevApp.controller('adminOrderController', function($scope, $rootScope, Order){
	$scope.justOrder = {};
	// for(var i = 0; i < $rootScope.allOrders.length; i++){
	// 	if($rootScope.allOrders[i]["status"] == 0)
	// 		$scope.justOrder.push($rootScope.allOrders[i]);
	// 	console.log($rootScope.allOrders[i]["status"]);
	// }
	$scope.justOrder = Order.index({'status': 0, '_token': $rootScope.user_csrf}, function(res){
		// console.log($scope.justOrder);
	});

	$scope.toggleOrderInfo = function(num){
		$scope.currentOrder = $scope.justOrder[num];
	};
});

/*===================================================
=            Admin-Transfered Controller            =
===================================================*/

chevApp.controller('adminTransferedController', function($scope, $rootScope, Order, Orders){
	$scope.transferedOrder = Order.index({'status': 1, '_token': $rootScope.user_csrf}, function(res){
		// console.log($scope.transferedOrder);
	});


	$scope.toggleOrderInfo = function(num){
		$scope.currentOrder = $scope.transferedOrder[num];
		$scope.ship = {};
		$scope.ship.status = 2; 
	};

	$scope.confirmShipping = function(){
		$scope.ship._token = $rootScope.user_csrf;
		Orders.update({temp_id: $scope.currentOrder.id}, $scope.ship, function(res){
			console.log("Hello");
			$("#orderInfo").modal('hide');
			$scope.transferedOrder = Order.index({'status': 1, '_token': $rootScope.user_csrf}, function(res){
				// console.log($scope.transferedOrder);
			});
		}, function(res){
				var errorList = JSON.parse(res['data']['error']['message']);
				errorList = errorList['messages'];
				
				$scope.valid = {};

				for (var i = 0; i < errorList.length; i++) {
					if(errorList[i] === "arrivalDate_missing")
						$scope.valid.arrival_date = "กรุณาใส่วันที่คาดว่าสินค้าจะถึง";
					else if(errorList[i] === "tracking_code_missing")
						$scope.valid.tracking_code = "กรุณาใส่ Tracking ID";
					
				};
		});
	};
});

/*===================================================
=            Admin-Shipped Controller            =
===================================================*/

chevApp.controller('adminShippedController', function($scope, $rootScope, Order, Orders){
	$scope.shippedOrder = Order.index({'status': 2, '_token': $rootScope.user_csrf}, function(res){
		console.log($scope.shippedOrder);
	});


	$scope.toggleOrderInfo = function(num){
		$scope.currentOrder = $scope.shippedOrder[num];
		$scope.ship = {};
		$scope.ship.status = 2; 
	};

	$scope.confirmShipping = function(){
		$scope.ship._token = $rootScope.user_csrf;
		Orders.update({temp_id: $scope.currentOrder.id}, $scope.ship, function(res){
			console.log("Hello");
			$("#orderInfo").modal('hide');
			$scope.shippedOrder = Order.index({'status': 2, '_token': $rootScope.user_csrf}, function(res){
				// console.log($scope.transferedOrder);
			});
		}, function(res){
				var errorList = JSON.parse(res['data']['error']['message']);
				errorList = errorList['messages'];
				
				$scope.valid = {};

				for (var i = 0; i < errorList.length; i++) {
					if(errorList[i] === "arrivalDate_missing")
						$scope.valid.arrival_date = "กรุณาใส่วันที่คาดว่าสินค้าจะถึง";
					else if(errorList[i] === "tracking_code_missing")
						$scope.valid.tracking_code = "กรุณาใส่ Tracking ID";
					
				};
		});
	};
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

isLogin = function($resource, $rootScope, callback)
{
	var isLogin = $resource('public/is-login', null);	
	isLogin.get({}, function(val){
		// console.log(val['user']);
		if(val['user'] != null){
			// console.log(val);
			$rootScope.isLogin = true;
			$rootScope.userInfo = val['user'];
			$rootScope.userInfo._token = val['csrf_token'];
			$rootScope.user_csrf = val['csrf_token'];
			// console.log($rootScope.userInfo);
			chevApp.constant("CSRF_TOKEN", val['csrf_token']);

		} else {
			$rootScope.isLogin = false;
			$rootScope.user_csrf = val['csrf_token'];
			chevApp.constant("CSRF_TOKEN", val['csrf_token']);
		}
		if(typeof callback !== 'undefined')
			callback();
	}, function(res){
		$rootScope.isLogin = false;
	});
};

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

/*=====================================================
=            Angular Directive (Components)           =
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
			// show: {method:'GET'},
		 	'update': {method: 'PUT', params:{id: '@user_id'}},
		 	'delete': {method: 'DELETE', params:{id: '@user_id'}}
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

chevApp.factory('AddUserAddress', function($resource){
	return $resource('public/user-address', 
		{}, 
		{
		 	store: {method: 'POST'}
		});
});

chevApp.factory('UserAddress', function($resource){
	return $resource('public/user-address/:add_id', 
		{}, 
		{
			// show: {method:'GET'},
		 	'update': {method: 'PUT', params:{id: '@add_id'}},
		 	'delete': {method: 'DELETE', params:{id: '@add_id'}}
		});
});

chevApp.factory('Cart', function($resource){
	return $resource('public/cart', 
		{}, 
		{
			index: {method:'GET'},
		 	store: {method: 'POST'}
		});
});

chevApp.factory('Order', function($resource){
	return $resource('public/order', 
		{}, 
		{
			index: {method: 'get', isArray:true},
			store: {method: 'POST'}
		});
});

chevApp.factory('Orders', function($resource){
	return $resource('public/order/:temp_id', 
		{}, 
		{
			get: {method:'GET', params:{id: '@temp_id', '_token': '@_token'}, isArray:true},
			'update': {method:'PUT', params:{id: '@temp_id', '_token': '@_token'}}
		});
});


