'use strict';

appMain.controller('UserDetailsController', function ($scope, $location, $routeParams,  AccountService) {

    if($routeParams.id !== undefined) {
        AccountService.getById($routeParams.id)
            .then(function (response) {
                $scope.currentUser = response;
            });
    }else{
        $location.path('/');
    }
});