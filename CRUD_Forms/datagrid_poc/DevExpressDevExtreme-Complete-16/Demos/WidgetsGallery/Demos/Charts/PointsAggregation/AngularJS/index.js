var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    var dataSource = [],
        max = 5000,
        i;
    
    for (i = 0; i < max; i++) {
        dataSource.push({ arg: i, val: i + i * (Math.random() - 0.5) });
    }
    
    $scope.chartOptions = {
        dataSource: dataSource,
        argumentAxis: {
            valueMarginsEnabled: false
        },
        useAggregation: true,
        legend: {
            visible: false
        },
        series: {
            point: {
                size: 7
            }
        }
    };
    
    $scope.rangeOptions = {
        size: {
            height: 120
        },
        dataSource: dataSource,
        chart: {
            series: {},
            useAggregation: true
        },
        scale: {
            minRange: 1
        },
        sliderMarker: {
            format: 'decimal'
        },
        behavior: {
            callSelectedRangeChanged: "onMoving",
            snapToTicks: false
        },
        onSelectedRangeChanged: function (e) {
            var zoomedChart = $("#chart-demo #zoomedChart").dxChart("instance");
            zoomedChart.zoomArgument(e.startValue, e.endValue);
        }
    };
});