'use strict';

appMain.factory('PhotosResource', function ($q, httQ) {
    var serviceUrl = "/api/images";

    return {        
		
		uploadPhoto: function (data) {
            return httQ.post(serviceUrl+'/upload', data);
        }
    };
});