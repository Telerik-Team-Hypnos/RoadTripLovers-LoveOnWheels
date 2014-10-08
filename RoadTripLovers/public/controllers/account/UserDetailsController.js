'use strict';

appMain.controller('UserDetailsController', function ($scope, $location, $routeParams, AccountService, MessagesResource) {
    
	if($routeParams.id !== undefined && AccountService.userData.isAuth===true) {		
        AccountService.getById($routeParams.id)
            .then(function (response) {
                $scope.currentUser = response;
				//messages				
				AccountService.checkIdentity();								
				//show messsages form				
				var currentUserId=response._id;
				var logedUserId=AccountService.userData.userId;				
				$scope.isMyProfile=(currentUserId===logedUserId);
				$scope.messages={};
				$scope.messages.sendMessage=function()
				{			
					//do some validation here
					var title=$scope.messages.title;
					var body=$scope.messages.body;
					var req={
						title:title,
						body:body,			
						sender:logedUserId,
						receiver:currentUserId
					};
					MessagesResource.addItem(req).then(function(responce){
						console.log(responce);
					});
					console.log(req);
				};
				//
            });
    }else{
        $location.path('/');
    }
});