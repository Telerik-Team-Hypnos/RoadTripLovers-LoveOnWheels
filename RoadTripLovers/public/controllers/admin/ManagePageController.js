'use strict';

appMain.controller('ManagePageController', function ($scope, $location, $routeParams,  PagesResource) {
    $scope.isEdit = false;
    $scope.buttonText = "Add Page";

    if($routeParams.id !== undefined) {
        PagesResource.getById($routeParams.id)
            .then(function (response) {
                $scope.pageData = response;
                $scope.isEdit = true;
                $scope.buttonText = "Edit Page";
            });
    }

    $scope.manageItem = function () {
        if($scope.isEdit){
            PagesResource.editItem($scope.pageData)
                .then(function () {
                    $location.path("/admin-panel")
                });
        } else {
            PagesResource.addItem($scope.pageData)
                .then(function () {
                    $location.path("/admin-panel")
                });
        }
    };
});