'use strict';

appMain.factory('AccountService', function ($q, httQ, localStorageService) {

    var authenticationData = {
        isAuth: false,
        userName: ""
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
                        userName: user.username
                    });

                    authenticationData.isAuth = true;
                    authenticationData.userName = user.username;

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
        }
    }

    function clearLoginData() {
        localStorageService.remove('authorizationData');

        authenticationData.isAuth = false;
        authenticationData.username = "";
    }

    return {
        registerUser: registerUser,
        loginUser: loginUser,
        logOutUser: logOutUser,
        checkIdentity: checkIdentity,
        userData: authenticationData
    };
});