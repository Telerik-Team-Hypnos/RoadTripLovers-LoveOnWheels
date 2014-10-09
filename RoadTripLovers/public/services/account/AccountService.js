'use strict';

appMain.factory('AccountService', function ($q, httQ, localStorageService) {

    var authenticationData = {
        isAuth: false,
        username: "",
        roles: []
    };

    function registerUser(registration) {
        return httQ.post("/api/users/", registration);
    }

    function getById(id) {
        return httQ.get("/api/users/" + id);
    }

    function loginUser(user) {
        var deferred = $q.defer();

        httQ.post('/api/login', user)
            .then(function (response) {
                if(response.success){
                    localStorageService.set('authorizationData', {
                        username: user.username,
                        roles: response.user.roles,
                        userId: response.user._id,
                        isTruckDriver: response.user.isTruckDriver
                    });

                    authenticationData.isAuth = true;
                    authenticationData.username = user.username;
                    authenticationData.userId = response.user._id;
                    authenticationData.roles = response.user.roles;
                    authenticationData.isTruckDriver = response.user.isTruckDriver;

                    deferred.resolve(response);
                }else{
                    deferred.reject(response);
                }
            }, function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function logOutUser() {
        httQ.post('/api/logout', "")
            .then(function (response) {
                clearLoginData();
            }, function (error) {
                clearLoginData();
            });
    }

    function checkIdentity() {
        var identityData = localStorageService.get('authorizationData');

        if (identityData) {
            authenticationData.isAuth = true;
            authenticationData.username = identityData.username;
            authenticationData.userId = identityData.userId;
            authenticationData.roles = identityData.roles;
            authenticationData.isTruckDriver = identityData.isTruckDriver;
        }
    }

    function clearLoginData() {
        localStorageService.remove('authorizationData');

        authenticationData.isAuth = false;
        authenticationData.username = "";
        authenticationData.userId = "";
        authenticationData.roles = [];
        authenticationData.isTruckDriver = ""
    }

    function checkRole(role){
        return authenticationData.roles.indexOf(role) > -1;
    }

    function editItem(profileData) {
        var identityData = localStorageService.get('authorizationData');
        identityData.isTruckDriver = profileData.isTruckDriver;
        authenticationData.isTruckDriver = profileData.isTruckDriver;

        return httQ.put('/api/users/', profileData);
    }

    function getAll(){
        return httQ.get("/api/users");
    }

    return {
        registerUser: registerUser,
        loginUser: loginUser,
        logOutUser: logOutUser,
        checkIdentity: checkIdentity,
        userData: authenticationData,
        checkRole: checkRole,
        getById: getById,
        editUserProfile: editItem,
        getAll: getAll
    };
});