"use strict";

appMain.factory('LiveChatResource', function(){
    var pubnub = PUBNUB.init({
        publish_key: 'pub-c-ad55e8d9-7494-43e2-bcbc-555cdb6423cc',
        subscribe_key: 'sub-c-c24abb5c-3f47-11e4-ac38-02ee2ddab7fe'
    });

    function subscribe(callback){
        pubnub.subscribe({
            channel: 'truckLovers',
            message: callback
        });
    }

    function sendMessage(message){
        pubnub.publish({
            channel: 'truckLovers',
            message: message
        });
    }

    function loadMessages(callback){
        pubnub.history({
            channel: 'truckLovers',
            count: 100,
            callback: callback
        });
    }

    return {
        subscribe: subscribe,
        sendMessage: sendMessage,
        loadMessages: loadMessages
    }
});