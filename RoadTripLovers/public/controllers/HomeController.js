'use strict';

appMain.controller('HomeController', function ($scope, $location, CountriesResource) {
    CountriesResource.getAll()
        .then(function(response){
            $scope.countries = response;
        });
});