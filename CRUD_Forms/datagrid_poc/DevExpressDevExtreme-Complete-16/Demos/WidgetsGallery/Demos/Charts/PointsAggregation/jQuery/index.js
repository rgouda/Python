$(function(){
    var dataSource = [],
        max = 5000,
        i;
    
    for (i = 0; i < max; i++) {
        dataSource.push({ arg: i, val: i + i * (Math.random() - 0.5) });
    }
    
    var chart = $("#zoomedChart").dxChart({
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
    }).dxChart("instance");
    
    $("#range-selector").dxRangeSelector({
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
            chart.zoomArgument(e.startValue, e.endValue);
        }
    });
});