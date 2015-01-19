/**
 * Created by http://rhizomik.net/~roberto/
 */
function initialize() {
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(-33, 151)
    }
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var image = 'images/beachflag.png';
    var myLatLng = new google.maps.LatLng(-33.890542, 151.274856);
    var beachMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image
    });
}
(function(){
    var app = angular.module("signup", [ ]);

    app.directive('signup', function(){
        return {
            restrict: 'E',
            templateUrl: 'partials/signup.html',
            controller: function() {
                this.tab = 1;

                this.setTab = function (newValue) {
                    this.tab = newValue;
                    if(tab = 2){
                        alert('lol');
                    }
                };

                this.isSet = function (tabName) {
                    return this.tab === tabName;
                }
            },
            controllerAs: 'tab'
        };
    });

})();
