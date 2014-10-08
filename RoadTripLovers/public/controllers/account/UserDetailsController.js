'use strict';

appMain.controller('UserDetailsController', function ($scope, $location, $routeParams, AccountService) {
    
	if($routeParams.id !== undefined && AccountService.userData.isAuth===true) {		
        AccountService.getById($routeParams.id)
            .then(function (response) {
                $scope.currentUser = response;
				//messages				
				AccountService.checkIdentity();								
				//show messsages form				
				var currentUserId=response._id;
				var logedUserId=AccountService.userData.userId;				
				$scope.isNotMyProfile=(currentUserId!==logedUserId);
				//
            });
    }else{
        $location.path('/');
    }
});