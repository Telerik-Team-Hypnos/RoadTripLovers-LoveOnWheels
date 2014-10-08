"use strict";

appMain.factory('CommentsResource', function($q, httQ){
    var serviceUrl = "/api/comments";

    return {
        getAll: function () {
            return httQ.get(serviceUrl);
        },
        addItem: function (data) {
            return httQ.post(serviceUrl, data);
        },
        getByReceiver: function (id) {
            return httQ.get(serviceUrl + "/" + id);
        }
    };
});