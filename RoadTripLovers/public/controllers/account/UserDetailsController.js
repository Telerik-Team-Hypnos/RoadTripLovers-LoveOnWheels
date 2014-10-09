'use strict';

appMain.controller('UserDetailsController',
    function ($scope, $location, $routeParams, AccountService, MessagesResource, TownsResource, CommentsResource, PhotosResource) {

        if ($routeParams.id !== undefined && AccountService.userData.isAuth === true) {
            $scope.goToUser = function(id){
                $('#view-messages-modal').modal('toggle');
                $location.path('/user-details/' + id);
            };

            $scope.newComment = {
                body: ''
            };
			//select default page to show
			$scope.detailsPage='profile';
			//photos
			$scope.photos={};
			$scope.photos.collection=[];
			$scope.photos.uploadPhoto=function(){
				alert('here!');
				PhotosResource.uploadPhoto({newPhoto:$scope.photos.newPhoto}).then(function(result){
					console.log(result);	
				});
			}
			//
            $scope.postComment = function () {
                var data = {
                    body: $scope.newComment.body,
                    date: new Date(),
                    sender:  AccountService.userData.userId,
                    receiver: $scope.currentUser._id
                }

                CommentsResource.addItem(data).then(function (success) {
                    success.sender = {};
                    success.sender.username = AccountService.userData.username;
                    $scope.comments.push(success);
                    $scope.newComment.body = '';
                }, function (error) {
                    console.log(error);
                })
            }

            CommentsResource.getByReceiver($routeParams.id).then(function (results) {
                $scope.comments = results;
            });

            AccountService.getById($routeParams.id)
                .then(function (response) {
                    $scope.currentUser = response;

                    TownsResource.getById(response.town).then(function (town) {
                        $scope.currentUser.town = town.name;
                        //$scope.currentUser.country = town.country.name;
                    });

                    //messages
                    AccountService.checkIdentity();
                    $scope.messages = {};

                    //show messages form
                    var currentUserId = response._id;
                    var logedUserId = AccountService.userData.userId;
                    $scope.loggedUserId = logedUserId;
                    $scope.isMyProfile = (currentUserId === logedUserId);

                    $scope.loadOlderMessages = function () {
                        MessagesResource.getByReceiverId(logedUserId).then(function (response) {
                            $scope.logedUserMessages = response;
                        });
                    }

                    //send message function
                    $scope.messages.sendMessage = function () {
                        //do some validation here
                        var title = $scope.messages.title;
                        var body = $scope.messages.body;
                        var req = {
                            title: title,
                            body: body,
                            sender: logedUserId,
                            receiver: currentUserId
                        };
                        MessagesResource.addItem(req).then(function (response) {
                            $('#send-message-modal').modal('hide');
                            $scope.messages.body = '';
                            $scope.messages.title = '';
                        });
                    };

                    //load messages, if the details page is the one for the logged user
                    if ($scope.isMyProfile) {
                        MessagesResource.getNewByReceiverId(logedUserId).then(function (response) {
                            $scope.unreadCount = response.length;
                            $scope.logedUserMessages = response;

                            if (response.length === 0) {
                                $scope.loadOlderMessages();
                            }
                        });
                    }
                });
        } else {
            $location.path('/');
        }
    });