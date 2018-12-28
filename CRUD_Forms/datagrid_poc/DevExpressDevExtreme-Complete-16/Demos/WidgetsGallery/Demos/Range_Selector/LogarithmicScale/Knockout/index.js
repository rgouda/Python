window.onload = function() {
    var dataSource = [],
        max = 100;
    
    for (var i = 0; i < max; i++) {
        dataSource.push({ arg: Math.pow(10, i * 0.1), val: Math.log(i + 1) / Math.log(0.5) + (Math.random() - 0.5) * (100 / (i + 1)) + 10 });
    }
    
    var viewModel = {
        chartOptions: {
            dataSource: dataSource,
            argumentAxis: {
                valueMarginsEnabled: false,
                type: "logarithmic",
                label: { format: "exponential" },
                grid: {
                    visible: true 
                },
                minorGrid: {
                    visible: true 
                },
                minorTickCount: 10
            },
            valueAxis: {
                placeholderSize: 50
            },
            legend: {
                visible: false
            },
            series: {}
        },
        rangeSelectorOptions: {
            size: {
                height: 120
            },
            dataSource: dataSource,
            chart: {
                series: {}
            },
            scale: {
                type: "logarithmic",
                label: { format: "exponential" },
                minRange: 1,
                minorTickCount: 10
            },
            sliderMarker: {
                format: "exponential"
            },
            behavior: {
                callSelectedRangeChanged: "onMoving",
                snapToTicks: false
            },
            onSelectedRangeChanged: function (e) {
                $("#zoomed-chart").dxChart("instance").zoomArgument(e.startValue, e.endValue);
            }
        }
    };
    
    ko.applyBindings(viewModel, $("#range-selector-demo").get(0));
};