'use strict';

appMain.controller('ManageTripController', function ($scope, $location, $routeParams,  AccountService,  TownsResource, TripsResource) {
    $scope.isEdit = false;
    $scope.buttonText = "Add Trip";

    TownsResource.getAll()
        .then(function (response) {
            $scope.towns = response;
        });

    if($routeParams.id !== undefined) {
        TripsResource.getById($routeParams.id)
            .then(function (response) {
                $scope.tripData = response;
                $scope.isEdit = true;
                $scope.buttonText = "Edit Trip";
            });
    }

    $scope.manageItem = function () {
        $scope.tripData.user = AccountService.userData.userId;

        if($scope.isEdit){
            TripsResource.editItem($scope.tripData)
                .then(function () {
                    $location.path("/profile")
                });
        } else {
            TripsResource.addItem($scope.tripData)
                .then(function () {
                    $location.path("/profile")
                });
        }
    };
});