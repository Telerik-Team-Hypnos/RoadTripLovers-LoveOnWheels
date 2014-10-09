'use strict';

appMain.controller('TripsController', function ($scope, $location, $log, TripsResource) {
    TripsResource.getAll()
        .then(function(response){
            $scope.trips = response;
        });
});