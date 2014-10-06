'use strict';

appMain.controller('ManageCountryController', function ($scope, $location, $routeParams,  CountriesResource) {
    $scope.isEdit = false;
    $scope.buttonText = "Add Country";

    if($routeParams.id !== undefined) {
        CountriesResource.getById($routeParams.id)
            .then(function (response) {
                $scope.countryData = response;
                $scope.isEdit = true;
                $scope.buttonText = "Edit Country";
            });
    }

    $scope.manageItem = function () {
        if($scope.isEdit){
            CountriesResource.editItem($scope.countryData)
                .then(function () {
                    $location.path("/admin-panel")
                });
        } else {
            CountriesResource.addItem($scope.countryData)
                .then(function () {
                    $location.path("/admin-panel")
                });
        }
    };
});