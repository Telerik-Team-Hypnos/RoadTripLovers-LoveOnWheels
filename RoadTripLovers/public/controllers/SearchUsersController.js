'use strict';

appMain.controller('SearchUsersController', function ($scope, $location, $log, AccountService) {
    AccountService.getAll()
        .then(function(response){
            $scope.users = response;
        });
});