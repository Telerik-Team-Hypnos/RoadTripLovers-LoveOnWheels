'use strict';

appMain.controller('UserDetailsController',
    function ($scope, $location, $routeParams, AccountService, MessagesResource, TownsResource, CommentsResource) {

        $scope.newComment = {
            body: ''
        };

        $scope.postComment = function () {
            var data = {
                body: $scope.newComment.body,
                date: new Date(),
                sender: $scope.loggedUserId,
                receiver: $scope.currentUser._id
            }

            CommentsResource.addItem(data).then(function (success) {
                $scope.comments.push(success);
                $scope.newComment.body = '';
            }, function (error) {
                console.log(error);
            })
        }

        CommentsResource.getByReceiver($routeParams.id).then(function (results) {
            $scope.comments = results;
        });

        if ($routeParams.id !== undefined && AccountService.userData.isAuth === true) {
            AccountService.getById($routeParams.id)
                .then(function (response) {
                    $scope.currentUser = response;
                    TownsResource.getById(response.town).then(function (town) {
                        $scope.currentUser.town = town.name;
                        //$scope.currentUser.country = town.country.name;
                    });
                    //messages
                    AccountService.checkIdentity();
                    //show messages form
                    var currentUserId = response._id;
                    var logedUserId = AccountService.userData.userId;
                    $scope.loggedUserId = logedUserId;
                    $scope.isMyProfile = (currentUserId === logedUserId);
                    $scope.messages = {};
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
                        MessagesResource.addItem(req).then(function (responce) {
                            $('#sendMessageModal').modal('hide');
                        });
                    };
                    //
                });
        } else {
            $location.path('/');
        }
    });