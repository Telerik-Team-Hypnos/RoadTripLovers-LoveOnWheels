'use strict';

appMain.controller('SignUpController', function ($scope, $location, AccountService) {
    $scope.successfulRegistration = false;
    $scope.formMessage = "";

    $scope.registration = {
        username: "",
        password: "",
        confirmPassword: ""
    };

    if(AccountService.userData.isAuth === true){
        AccountService.logOutUser();
    }

    $scope.signUp = function signUpFunction() {

        if ($scope.registration.username === ""){
            $scope.formMessage = "Your username must be at least 6 symbols";
            return;
        }

        if ($scope.registration.password.length < 6){
            $scope.formMessage = "Your Password must be at least 6 symbols";
            return;
        }

        if ($scope.registration.confirmPassword.length < 6 || $scope.registration.confirmPassword !== $scope.registration.password){
            $scope.formMessage = "Password confirmation does not match!";
            return;
        }

        AccountService.registerUser($scope.registration)
            .then(function (response) {
                $scope.successfulRegistration = true;
                $scope.formMessage = "Registered successfully, redirecting to home page...";
                $location.path("/");
            }, function (error) {
                $scope.formMessage = error.message;
            });
    };
});