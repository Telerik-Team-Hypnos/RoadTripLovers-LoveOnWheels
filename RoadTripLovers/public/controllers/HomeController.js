'use strict';

appMain.controller('HomeController', function ($scope, $location, AccountService) {
    AccountService.getAll()
        .then(function(response){
            $scope.users = response;

		    //console.log(response);
        });
});