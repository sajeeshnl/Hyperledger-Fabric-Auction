// SPDX-License-Identifier: Apache-2.0

var application = angular.module('application', ['ngRoute']);

application.config(function($routeProvider) {
	$routeProvider
		.when('/assets', {
			templateUrl: 'userView.html',
			controller: 'assetController'
		})
    .when('/login',{
      templateUrl: 'login.html',
			controller: 'loginController'
    })
    .when('/signup',{
      templateUrl: 'signup.html',
			controller: 'signupController'
    })
		.otherwise({
			redirectTo: '/login'
		});
});
