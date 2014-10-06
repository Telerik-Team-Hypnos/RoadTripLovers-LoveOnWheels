'use strict';

appMain.controller('ManageProfileController', function ($scope, $location, $routeParams, AccountService, TownsResource) {
    $scope.sexTypes = ['Male', 'Female', 'Shemale','Hermaphrodite','Other']
    AccountService.getById(AccountService.userData.userId)
        .then(function (response) {
            $scope.profileData = response;
        });

    TownsResource.getAll()
        .then(function (response) {
            $scope.towns = response;
        });
    
    $scope.updateProfile = function () {
        AccountService.editUserProfile($scope.profileData)
            .then(function () {
                $location.path("/")
            });
    }
});