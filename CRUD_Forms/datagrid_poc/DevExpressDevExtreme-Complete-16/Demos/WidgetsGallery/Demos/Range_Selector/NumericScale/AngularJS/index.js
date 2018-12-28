var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.rangeSelectorOptions = {
        dataSource: dataSource,
        margin: {
            top: 50
        },
        size: {
            height: 400
        },
        chart: {
            commonSeriesSettings: {
                type: "spline",
                argumentField: "weight"
            },
            series: [
                { valueField: "appleCost", color: "#00ff00" },
                { valueField: "orangeCost", color: "#ffa500" }
            ]
        },
        scale: {
            valueType: "numeric"
        },
        selectedRange: {
            startValue: "1",
            endValue: "2"
        },
        title: "Select a Product Weight"
    };
});