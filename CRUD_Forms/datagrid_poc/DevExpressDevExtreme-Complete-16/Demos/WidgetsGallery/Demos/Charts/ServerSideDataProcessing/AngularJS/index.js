var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    var chart,
        options = {
            dataSource: [],
            size: {
                height: 420
            },
            series: {
                argumentField: "Number",
                valueField: "Temperature",
                type: "spline"
            },
            legend: {
                visible: false
            },
            commonPaneSettings: {
                border: {
                    visible: true,
                    width: 2,
                    top: false,
                    right: false
                }
            },
            "export": {
                enabled: true
            },
            tooltip: {
                enabled: true,
                customizeTooltip: function (arg) {
                    return {
                        text: arg.valueText + "&#176C"
                    };
                }
            },
            valueAxis: {
                valueType: "numeric",
                constantLines: [{
                    value: undefined,
                    width: 2,
                    dashStyle: "dash",
                    color: "#ff7c7c",
                    label: {
                        text: "Highest"
                    }
                }, {
                    value: undefined,
                    width: 2,
                    dashStyle: "dash",
                    color: "#8c8cff",
                    label: {
                        text: "Lowest"
                    }
                }, {
                    value: undefined,
                    width: 1,
                    dashStyle: "dash",
                    label: {
                        text: "Average"
                    }
                }],
                grid: {
                    opacity: 0.2
                },
                label: {
                    customizeText: function() {
                        return this.valueText + "&#176C";
                    }
                }
            },
            argumentAxis: {
                type: "discrete",
                grid: {
                    visible: true,
                    opacity: 0.5
                }
            },
            onInitialized: function(e) {
                chart = e.component;
            }
        };
    
    $scope.chartOptions = options;
    $scope.currentMonth = undefined;
    
    var monthDataStore = new DevExpress.data.DataSource({
        store: {
            type: "odata",
            url: "https://js.devexpress.com/Demos/WidgetsGallery/odata/WeatherItems",
            onLoaded: function(results) {
                var data = results[0],
                    newOptions = {
                        dataSource: data.DayItems,
                        title: "Temperature in Barcelona: " +
                            data.Name.substr(0, 1).toUpperCase() +
                            data.Name.substr(1) + " 2012",
                        series: {
                            color: data.Color
                        },
                        valueAxis: {
                            min: data.RecordLow - 1,
                            max: data.RecordHigh + 1,
                            constantLines: [{
                                value: data.RecordHigh
                            }, {
                                value: data.RecordLow
                            }, {
                                value: data.Average
                            }]
                        }
                    };

                chart.option($.extend(true, {}, options, newOptions));
            }
        },
        expand: "DayItems"
    });
    
    $scope.monthOptions = {
        width: 150,
        items: months,
        valueExpr: "id",
        displayExpr: "name",
        bindingOptions: {
            value: "currentMonth"
        }
    };
    
    $scope.$watch("currentMonth", changeMonthData);
    $scope.currentMonth = 1;
    
    function changeMonthData(monthId) {
        monthDataStore.filter(["Id", "=", monthId]);
        monthDataStore.load();
    }
});