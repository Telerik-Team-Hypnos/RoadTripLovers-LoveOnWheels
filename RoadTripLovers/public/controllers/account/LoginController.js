'use strict';

appMain.controller('LoginController', function ($scope, $location, AccountService) {
    $scope.user = {
        username: "",
        password: ""
    };

    $scope.message = "";

    if(AccountService.userData.isAuth === true){
        AccountService.logOutUser();
    }

    $scope.login = function loginFunction() {
        AccountService.loginUser($scope.user)
            .then(function () {
                $location.path("/home");
            }, function () {
                $scope.message = "Wrong username and/or password!";
            });
    };
});