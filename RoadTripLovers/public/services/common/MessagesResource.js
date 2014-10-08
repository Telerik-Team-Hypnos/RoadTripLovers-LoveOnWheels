'use strict';

appMain.factory('MessagesResource', function ($q, httQ) {
    var serviceUrl = "/api/messages";

    return {
        /*getAll: function () {
            return httQ.get(serviceUrl);
        },*/
		
		getByReceiverId: function(userId/*page,filter*/){
			return httQ.get(serviceUrl+'/'+userId);
		},
		
        addItem: function (data) {
            return httQ.post(serviceUrl, data);
        },
        /*editItem: function (data) {
            return httQ.put(serviceUrl, data);
        },
        getById: function (id) {
            return httQ.get(serviceUrl + "/" + id);
        }*/
    };
});