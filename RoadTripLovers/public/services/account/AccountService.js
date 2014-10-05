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

    function loginUser(user) {
        var deferred = $q.defer();

        httQ.post('/api/login', user)
            .then(function (response) {
                if(response.success){
                    localStorageService.set('authorizationData', {
                        username: user.username,
                        roles: response.user.roles
                    });

                    authenticationData.isAuth = true;
                    authenticationData.username = user.username;
                    authenticationData.roles = response.user.roles;

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
            authenticationData.roles = identityData.roles;
        }
    }

    function clearLoginData() {
        localStorageService.remove('authorizationData');

        authenticationData.isAuth = false;
        authenticationData.username = "";
        authenticationData.roles = [];
    }

    function checkRole(role){
        return authenticationData.roles.indexOf(role) > -1;
    }

    return {
        registerUser: registerUser,
        loginUser: loginUser,
        logOutUser: logOutUser,
        checkIdentity: checkIdentity,
        userData: authenticationData,
        checkRole: checkRole
    };
});