/**
 * Created by http://rhizomik.net/~roberto/
 */

(function(){
    var app = angular.module('actesJS',  ['http-auth-interceptor','satellizer']);

    app.controller("ActesController", ["$http",
        function($http) {
            this.GREETINGS_API = "http://127.0.0.1:8080/";
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
                $http.get(this.GREETINGS_API)
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

    app.controller('LoginCtrl', function($scope, $auth) {
        $scope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };
        $scope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(response) {
                alert('Signed In.');
            });
        };

    });

    app.config(function($authProvider) {

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

}());
