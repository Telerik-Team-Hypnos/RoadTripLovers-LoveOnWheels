﻿'use strict';

appMain.controller('PageController', function ($scope, $location, appSettings, AccountService) {
    $scope.title = "Simple Blog System";
    $scope.author = appSettings.author;
    $scope.authorLink = appSettings.authorLink;
    $scope.poweredBy = appSettings.poweredBy;

    $scope.logOut = function () {
        AccountService.logOutUser();
        $location.path('/home');
    };

    $scope.userData = AccountService.userData;
    $scope.checkRole = AccountService.checkRole;
});