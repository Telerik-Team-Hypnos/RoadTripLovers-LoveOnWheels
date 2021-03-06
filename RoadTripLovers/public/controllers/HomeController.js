﻿'use strict';

appMain.controller('HomeController', function ($scope, $location, $log, AccountService, LiveChatResource) {
    AccountService.getAll()
        .then(function(response){
            $scope.users = response;

		    //console.log(response);
        });

    LiveChatResource.loadMessages(function(messages){
        $scope.messages = messages[0];
        $scope.$apply();
        scrollToBottom();
    });

    LiveChatResource.subscribe(function(messages){
        $scope.messages = $scope.messages.concat(messages);
        $scope.$apply();
        scrollToBottom();
    });

    $scope.send = function(){
        var message = {
            user: AccountService.userData.username || "Anonymous",
            text: $scope.messageText
        }

        $scope.messageText='';
        LiveChatResource.sendMessage(message);
    }

    function scrollToBottom(){
        var objDiv = document.getElementById("messages-box");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
});