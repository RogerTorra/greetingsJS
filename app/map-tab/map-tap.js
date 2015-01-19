/**
 * Created by roger on 17/01/2015.
 */
var module = angular.module("maps-tap", ["google-maps"]);
function ExampleController ($scope) {
    angular.extend($scope, {
        centerProperty: {
            lat: 45,
            lng: -73
        },
        zoomProperty: 8,
        markersProperty: [ {
            latitude: 45,
            longitude: -74
        }],
        clickedLatitudeProperty: null,
        clickedLongitudeProperty: null
    });
}