'use strict';

appMain.factory('CountriesResource', function ($q, httQ) {
    var serviceUrl = "/api/countries";

    return {
        getAll: function () {
            return httQ.get(serviceUrl);
        },
        add: function (data) {
            return httQ.post(serviceUrl, data);
        },
        getById: function (id) {
            return httQ.get(serviceUrl + "/" + id);
        }
    };
});