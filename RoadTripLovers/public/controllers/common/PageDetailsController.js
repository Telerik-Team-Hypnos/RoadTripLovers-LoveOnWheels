'use strict';

appMain.controller('PageDetailsController', function ($scope, $location, $routeParams,  PagesResource) {

    if($routeParams.id !== undefined) {
        PagesResource.getById($routeParams.id)
            .then(function (response) {
                $scope.currentPage = response;
            });
    }else{
        $location.path('/');
    }
});