'use strict';

appMain.controller('ManageTownController', function ($scope, $location, $routeParams,  TownsResource, CountriesResource) {
    $scope.isEdit = false;
    $scope.buttonText = "Add Town";

    CountriesResource.getAll()
        .then(function (response) {
            $scope.countries = response;
        });
    
    if($routeParams.id !== undefined) {
        TownsResource.getById($routeParams.id)
            .then(function (response) {
                $scope.townData = response;
                $scope.isEdit = true;
                $scope.buttonText = "Edit Town";
            });
    }

    $scope.manageItem = function () {
        if($scope.isEdit){
            TownsResource.editItem($scope.townData)
                .then(function () {
                    $location.path("/admin-panel")
                });
        } else {
            TownsResource.addItem($scope.townData)
                .then(function () {
                    $location.path("/admin-panel")
                });
        }
    };
});