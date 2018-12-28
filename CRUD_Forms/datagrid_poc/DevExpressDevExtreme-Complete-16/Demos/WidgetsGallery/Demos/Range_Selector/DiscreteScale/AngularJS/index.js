var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.totalResult = "16,254,000";
    
    $scope.rangeSelectorOptions = {
        size: {
            height: 200
        },
        dataSource: dataSource,
        chart: {
            commonSeriesSettings: {
                argumentField: "country",
                type: "bar"
            },
            series: [
                { valueField: "copper", name: "Copper" }
            ]
        },
        title: "Copper Production in 2013",
        onSelectedRangeChanged: function (e) {
            var data = e.component.option("dataSource"),
                total = 0,
                startIndex,
                endIndex;
    
            data.forEach(function(item, i){
                if (item.country == e.startValue )
                    startIndex = i;
                else if (item.country == e.endValue)
                    endIndex = i;
            });
    
            if(endIndex) {
                data
                    .slice(startIndex, endIndex + 1)
                    .forEach(function(item){
                        total += item.copper;
                    });
            }
            else {
                total = data[startIndex].copper;
            }
    
            $scope.totalResult = Globalize.formatNumber(total, { maximumFractionDigits: 0 });
        }
    };
});