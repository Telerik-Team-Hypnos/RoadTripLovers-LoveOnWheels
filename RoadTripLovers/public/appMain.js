'use strict';

var appMain = angular.module('appMain', ['ngRoute', 'LocalStorageModule', 'httpQRequest']);

appMain.constant("appSettings", {
    author: "Road Trip Lovers - Love On Wheels ",
    authorLink: "http://telerikacademy.com",
    poweredBy: "AngularJs"
});

appMain.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "HomeController",
        templateUrl: "/partials/home/home"
    });

    $routeProvider.when("/login", {
        controller: "LoginController",
        templateUrl: "/partials/account/login"
    });

    $routeProvider.when("/signup", {
        controller: "SignUpController",
        templateUrl: "/partials/account/signup"
    });

    $routeProvider.when("/profile", {
        controller: "ManageProfileController",
        templateUrl: "/partials/account/profile"
    });

    $routeProvider.when("/user-details/:id", {
        controller: "UserDetailsController",
        templateUrl: "/partials/home/user-details"
    });

    $routeProvider.when("/page-details/:id", {
        controller: "PageDetailsController",
        templateUrl: "/partials/home/page-details"
    });

    $routeProvider.when("/mange-trip/:id?", {
        controller: "ManageTripController",
        templateUrl: "/partials/trip/manage-trip"
    });

    $routeProvider.when("/search-users/", {
        controller: "SearchUsersController",
        templateUrl: "/partials/home/search-users"
    });

    $routeProvider.when("/search-drivers/", {
        controller: "SearchUsersController",
        templateUrl: "/partials/home/search-drivers"
    });

    // Admin Stuff
    $routeProvider.when("/admin-panel", {
        controller: "AdminPanelController",
        templateUrl: "/partials/admin/panel"
    });

    $routeProvider.when("/manage-country/:id?", {
        controller: "ManageCountryController",
        templateUrl: "/partials/admin/manage-country"
    });

    $routeProvider.when("/manage-town/:id?", {
        controller: "ManageTownController",
        templateUrl: "/partials/admin/manage-town"
    });

    $routeProvider.when("/manage-page/:id?", {
        controller: "ManagePageController",
        templateUrl: "/partials/admin/manage-page"
    });

//	$routeProvider.when("/search-users", {
//		controller: "SearchUsersController",
//		templateUrl: "/partials/account/profile"
//	});


    $routeProvider.otherwise({ redirectTo: "/home" });
});

appMain.run(function (AccountService) {
    AccountService.checkIdentity();
});