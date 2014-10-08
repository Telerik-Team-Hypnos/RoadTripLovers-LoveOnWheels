'use strict';

appMain.controller('UserDetailsController',
    function ($scope, $location, $routeParams, AccountService, MessagesResource, TownsResource, CommentsResource) {
    $scope.messageBoxVisible = true;

    $scope.showMessageBox = function (){
        $scope.messageBoxVisible = true;
    }

    $scope.hideMessageBox = function (){
        $scope.messageBoxVisible = false;
    }

    $scope.postComment = function(comment){
        var data = {
            title: comment.title,
            body: comment.body,
            date: new Date(),
            sender: $scope.currentUser._id,
            receiver: $scope.loggedUserId
        }

        CommentsResource.addItem(data).then(function(success){
            console.log(success);
        }, function(error){
            console.log(error);
        })
    }

	if($routeParams.id !== undefined && AccountService.userData.isAuth===true) {		
        AccountService.getById($routeParams.id)
            .then(function (response) {
                console.log(response);
                $scope.currentUser = response;
                TownsResource.getById(response.town).then(function(town){
                    console.log(town);
                    $scope.currentUser.town = town.name;
                    //$scope.currentUser.country = town.country.name;
                });
				//messages				
				AccountService.checkIdentity();								
				//show messsages form				
				var currentUserId=response._id;
				var logedUserId=AccountService.userData.userId;
                $scope.loggedUserId = logedUserId;
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