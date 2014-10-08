'use strict';

appMain.controller('ManageProfileController', function ($scope, $location, $routeParams, AccountService, TownsResource, TripsResource) {
    $scope.sexTypes = ['Male', 'Female', 'Shemale','Hermaphrodite','Other']

    AccountService.getById(AccountService.userData.userId)
        .then(function (response) {
            $scope.profileData = response;
        });

    TownsResource.getAll()
        .then(function (response) {
            $scope.towns = response;
        });

    TripsResource.getByUser(AccountService.userData.userId)
        .then(function (response) {
            $scope.trips = response;
            $scope.tripsCount = response.length;
        });
    
    $scope.updateProfile = function () {
        AccountService.editUserProfile($scope.profileData)
            .then(function () {
                $location.path("/")
            });
    }
});