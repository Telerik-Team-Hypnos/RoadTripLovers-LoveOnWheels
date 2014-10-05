'use strict';

appMain.controller('HeaderController', function ($scope, $location, AccountService) {
    $scope.title = "Simple Blog System";

    $scope.logOut = function () {
        AccountService.logOutUser();
        $location.path('/home');
    };

    $scope.userData = AccountService.userData;
    console.log($scope.userData);
});