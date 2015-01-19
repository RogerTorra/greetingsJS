/**
 * Created by http://rhizomik.net/~roberto/
 */

(function(){
    var app = angular.module("acteTab", [ ]);

    app.directive('acteTab', function(){
        return {
            restrict: 'E',
            templateUrl: 'acte-tab/acte-tab.html',
            controller: function() {
                this.tab = 1;

                this.setTab = function (newValue) {
                    this.tab = newValue;
                    if(this.tab==2){google.maps.event.addDomListener(window, 'load', initialize);}
                };

                this.isSet = function (tabName) {
                    return this.tab === tabName;
                }
            },
            controllerAs: 'tab'
        };
    });

})();
