'use strict';

appMain.controller('SearchUsersController', function ($scope, $location, $log, AccountService, TownsResource) {
	var cashedUsers;

    AccountService.getAll()
        .then(function(response){
		    cashedUsers = response;
            $scope.users = response;
        });

	TownsResource.getAll()
		.then(function (response) {
			response.unshift({name: 'All'});
			$scope.userTown = response[0];
			$scope.towns = response;
		});

	$scope.genderTypes = ['All', 'Male', 'Female', 'Shemale','Hermaphrodite','Other'];

	$scope.userGender = 'All';

	$scope.filterUsers = function () {
		var unfilteredUsers = cashedUsers;
		var numberOfUsers = unfilteredUsers.length;
		var filteredUsers = [];

		for (var i = 0; i < numberOfUsers; i++) {
			if ($scope.userGender === 'All' && $scope.userTown.name === 'All') {
				filteredUsers.push(unfilteredUsers[i]);
			} else if (unfilteredUsers[i].sex && $scope.userGender === unfilteredUsers[i].sex && $scope.userTown.name === 'All') {
				filteredUsers.push(unfilteredUsers[i]);
			} else if (unfilteredUsers[i].town && $scope.userGender === 'All' && $scope.userTown.name === unfilteredUsers[i].town.name) {
				filteredUsers.push(unfilteredUsers[i]);
			} else if (unfilteredUsers[i].sex && unfilteredUsers[i].town && $scope.userGender === unfilteredUsers[i].sex && $scope.userTown.name === unfilteredUsers[i].town.name) {
				filteredUsers.push(unfilteredUsers[i]);
			}
		}

		$scope.users = filteredUsers;
	};
});