'use strict';

var appMain = angular.module('appMain', ['ngRoute', 'LocalStorageModule', 'httpQRequest']);

appMain.constant("appSettings", {
    author: "Pesho Dev International",
    authorLink: "http://telerikacademy.com",
    poweredBy: "AngularJs"
});

appMain.config(function ($routeProvider, appSettings) {

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

    $routeProvider.otherwise({ redirectTo: "/home" });
});

appMain.run(function (AccountService) {
    AccountService.checkIdentity();
});