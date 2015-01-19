/**
 * Created by http://rhizomik.net/~roberto/
 */
//'ngResource', 'ngMessages', 'ui.router', 'mgcrea.ngStrap',
(function(){
    var app = angular.module('actesJS',  ['ngResource','mgcrea.ngStrap','ngMessages','ui.router','satellizer','acteTab']);

    app.controller("ActesController", ["$http",
        function($http,$alert) {
            this.GREETINGS_API = "http://sportsbarcelona.herokuapp.com/";//"http://127.0.0.1:8080/";
            this.newActe = {'start_time': Date.now()};
            this.loading = false;
            var acteCtrl = this;
            this.isLoading = function(){
                return this.loading;
            };

            this.noActes = function(){
                return this.actes === undefined;
            }

            this.listActes = function(){
                this.loading = true;
                $http.get(this.GREETINGS_API,{
                    headers: {
                        'Access-Control-Request-Headers': 'X-Auth'
                    }
                })
                    .success(function (data) {
                        acteCtrl.actes = data;
                    });
            };

            this.addGreeting = function(){
                $http.post(this.GREETINGS_API, this.newGreeting)
                    .then(function(){
                        greetingCtrl.newGreeting = {'date': Date.now()};
                        greetingCtrl.listGreetings();
                    });
            };
        }]);

    app.controller('Login', function($scope, $auth) {

        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(response) {
                console.log(response.data.token.email);
                alert('Signed In.');
            });

        };
        $scope.logout = function() {
            if (!$auth.isAuthenticated()) {
                return;
            }
            $auth.logout()
                .then(function() {
                    alert('Signed out.');
                });

        }

    });
    app.controller('LogoutCtrl', function($auth, $alert) {

        if (!$auth.isAuthenticated()) {
            return;
        }
        $auth.logout()
            .then(function() {
                $alert({
                    content: 'You have been logged out',
                    animation: 'fadeZoomFadeDown',
                    type: 'material',
                    duration: 3
                });
            });
    });
    app.config(function($urlRouterProvider,$stateProvider,$authProvider,$httpProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'partials/home.html'
            }).state('signup', {
                url: '/signup',
                templateUrl: 'partials/signup.html',
                controller: 'SignupCtrl'
            }).state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'partials/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    authenticated: function($q, $location, $auth) {
                        var deferred = $q.defer();

                        if (!$auth.isAuthenticated()) {
                            $location.path('/login');
                        } else {
                            deferred.resolve();
                        }

                        return deferred.promise;
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
        $authProvider.facebook({
            clientId: ''
        });

        $authProvider.google({
            clientId: '596418903940-dit8vkf4v2mnnq1d0khn158es8neakpk.apps.googleusercontent.com'
        });

        $authProvider.github({
            clientId: ''
        });

        $authProvider.linkedin({
            clientId: ''
        });

        $authProvider.yahoo({
            clientId: '--'
        });

        $authProvider.live({
            clientId: '000000004C12E68D'
        });

        $authProvider.twitter({
            url: '/auth/twitter'
        });


    });
    app.factory('Account', function($http) {
        return {
            getProfile: function() {
                user = $http.get('/api/me');
                return $http.get('/api/me');
            },
            updateProfile: function(profileData) {
                return $http.put('/api/me', profileData);
            }
        };
    });
    app.controller('ProfileCtrl', function($scope, $auth, $alert, Account) {

        /**
         * Get user's profile information.
         */
        $scope.getProfile = function() {
            Account.getProfile()
                .success(function(data) {
                    $scope.user = data;
                })
                .error(function(error) {
                    $alert({
                        content: error.message,
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                });
        };


        /**
         * Update user's profile information.
         */
        $scope.updateProfile = function() {
            Account.updateProfile({
                displayName: $scope.user.displayName,
                email: $scope.user.email
            }).then(function() {
                /*$alert({
                    content: 'Profile has been updated',
                    animation: 'fadeZoomFadeDown',
                    type: 'material',
                    duration: 3
                });*/
            });
        };

        /**
         * Link third-party provider.
         */
        $scope.link = function(provider) {
            $auth.link(provider)
                .then(function() {
                   $alert({
                        content: 'You have successfully linked ' + provider + ' account',
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                })
                .then(function() {
                    $scope.getProfile();
                })
                .catch(function(response) {
                    console.log(response.data.message);
                    $alert({
                        content: response.data.message,
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                });
        };

        /**
         * Unlink third-party provider.
         */
        $scope.unlink = function(provider) {
            $auth.unlink(provider)
                .then(function() {
                    $alert({
                        content: 'You have successfully unlinked ' + provider + ' account',
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                })
                .then(function() {
                    $scope.getProfile();
                })
                .catch(function(response) {
                    $alert({
                        content: response.data ? response.data.message : 'Could not unlink ' + provider + ' account',
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                });
        };

        $scope.getProfile();

    });
    app.controller('SignupCtrl', function($scope, $alert, $auth) {
        $scope.signup = function() {
            $auth.signup({
                displayName: $scope.displayName,
                email: $scope.email,
                password: $scope.password
            }).catch(function(response) {
                if (typeof response.data.message === 'object') {
                    angular.forEach(response.data.message, function(message) {
                        $alert({
                            content: message[0],
                            animation: 'fadeZoomFadeDown',
                            type: 'material',
                            duration: 3
                        });
                    });
                } else {
                    $alert({
                        content: response.data.message,
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                }
            });
        };
    });
    app.controller('LoginCtrl', function($scope, $alert, $auth) {
        $scope.login = function() {
            $auth.login({ email: $scope.email, password: $scope.password })
                .then(function() {
                    $alert({
                        content: 'You have successfully logged in',
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                })
                .catch(function(response) {
                    $alert({
                        content: response.data.message,
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                });
        };
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function() {
                    $alert({
                        content: 'You have successfully logged in',
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                })
                .catch(function(response) {
                    $alert({
                        content: response.data.message,
                        animation: 'fadeZoomFadeDown',
                        type: 'material',
                        duration: 3
                    });
                });
        };
    });
}());
