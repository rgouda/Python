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
                type: "steparea",
                argumentField: "date"
            },
            series: [
              { valueField: "dayT", color: "yellow" },
              { valueField: "nightT" }
            ]
        },
        scale: {
            minorTickInterval: "day",
            tickInterval: "day",
            valueType: "datetime"
        },
        sliderMarker: {
            format: "day"
        },
        selectedRange: {
            startValue: "2013/03/01",
            endValue: "2013/03/07"
        },
        title: "Select a Month Period"
    };
});