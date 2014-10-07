'use strict';

appMain.controller('AdminPanelController', function ($scope, $location, CountriesResource, TownsResource, PagesResource) {
    CountriesResource.getAll()
        .then(function(response){
            $scope.countries = response;
            $scope.countriesCount = response.length;
        });

    TownsResource.getAll()
        .then(function(response){
            $scope.towns = response;
            $scope.townsCount = response.length;
        });

    PagesResource.getAll()
        .then(function(response){
            $scope.pages = response;
            $scope.pagesCount = response.length;
        });
});