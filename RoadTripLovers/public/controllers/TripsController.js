'use strict';

appMain.controller('TripsController', function ($scope, $location, $log, TripsResource, TownsResource) {
	var cashedTrips;
	$scope.tripDriver = '';

	var orders = ['Ascending', 'Descending'];
	$scope.orders = orders;
	$scope.tripOrder = orders[0];

    TripsResource.getAll()
        .then(function(response){
		    cashedTrips = response;
            $scope.trips = cashedTrips.filter(function (el) {
	            return new Date(el.startDate) > new Date();
            });
        });

	TownsResource.getAll()
		.then(function (response) {
			response.unshift({name: 'All'});
			$scope.tripStartTown = response[0];
			$scope.tripEndTown = response[0];
			$scope.towns = response;
		});


	$scope.filterTrips = function () {
		var unfilteredTrips = cashedTrips;
		var numberOfTrips = unfilteredTrips.length;
		var filteredTrips = [];

		for (var i = 0; i < numberOfTrips; i++) {
			if (new Date(unfilteredTrips[i].endDate) - new Date() < 0) {
				continue;
			}

			if ($scope.tripStartTown.name === 'All' && $scope.tripEndTown.name === 'All' && unfilteredTrips[i].user.username.indexOf($scope.tripDriver) > -1) {
				filteredTrips.push(unfilteredTrips[i]);
			} else if ($scope.tripStartTown.name  === unfilteredTrips[i].startTown.name && $scope.tripEndTown.name === 'All' && unfilteredTrips[i].user.username.indexOf($scope.tripDriver) > -1) {
				filteredTrips.push(unfilteredTrips[i]);
			} else if ($scope.tripStartTown.name === 'All' && $scope.tripEndTown.name === unfilteredTrips[i].endTown.name && unfilteredTrips[i].user.username.indexOf($scope.tripDriver) > -1) {
				filteredTrips.push(unfilteredTrips[i]);
			} else if ($scope.tripStartTown.name  === unfilteredTrips[i].startTown.name && $scope.tripEndTown.name === unfilteredTrips[i].endTown.name && unfilteredTrips[i].user.username.indexOf($scope.tripDriver) > -1) {
				filteredTrips.push(unfilteredTrips[i]);
			}
		}

		filteredTrips.sort(function(a,b){
			return new Date(a.startDate) - new Date(b.startDate);
		});

		if ($scope.tripOrder === 'Descending') {
			filteredTrips.reverse();
		}

		$scope.trips = filteredTrips;
	};
});