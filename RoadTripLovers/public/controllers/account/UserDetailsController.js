'use strict';

appMain.controller('UserDetailsController',
    function ($scope, $location, $routeParams, AccountService, MessagesResource, TownsResource, CommentsResource) {
        $scope.messageBoxVisible = true;

        $scope.showMessageBox = function () {
            $scope.messageBoxVisible = true;
        }

        $scope.hideMessageBox = function () {
            $scope.messageBoxVisible = false;
        }

        $scope.postComment = function (comment) {
            var data = {
                body: comment.body,
                date: new Date(),
                sender: $scope.loggedUserId,
                receiver: $scope.currentUser._id
            }

            CommentsResource.addItem(data).then(function (success) {
                $scope.comments.push(success);
                scrollToBottom();
            }, function (error) {
                console.log(error);
            })
        }

        CommentsResource.getByReceiver($routeParams.id).then(function (results) {
            console.log(results);
            $scope.comments = results;
            scrollToBottom();
        });

        function scrollToBottom(){
            var objDiv = document.getElementById("comments");
            objDiv.scrollTop = objDiv.scrollHeight;
        }

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