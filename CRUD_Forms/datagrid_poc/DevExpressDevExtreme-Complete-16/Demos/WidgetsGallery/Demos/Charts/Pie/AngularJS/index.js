var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.chartOptions = {
        size: {
            width: 500
        },
        palette: "bright",
        dataSource: dataSource,
        series: [
            {
                argumentField: "country",
                valueField: "area",
                label: {
                    visible: true,
                    connector: {
                        visible: true,
                        width: 1
                    }
                }
            }
        ],
        title: "Area of Countries",
        "export": {
            enabled: true
        },
        onPointClick: function (e) {
            var point = e.target;
    
            toggleVisibility(point);
        },
        onLegendClick: function (e) {
            var arg = e.target;
    
            toggleVisibility(this.getAllSeries()[0].getPointsByArg(arg)[0]);
        }
    };
    
    function toggleVisibility(item) {
        if(item.isVisible()) {
            item.hide();
        } else { 
            item.show();
        }
    }
});