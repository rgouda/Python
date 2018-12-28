$(function(){
    $("#range-selector").dxRangeSelector({
        margin: {
            top: 50
        },
        size: {
            height: 250
        },
        scale: {
            startValue: new Date(2011, 1, 1),
            endValue: new Date(2011, 6, 1),
            minorTickInterval: "day",
            tickInterval: { days: 7 },
            minRange: "week",
            maxRange: "month",
            minorTick: {
                visible: false,
            }
        },
        sliderMarker: {
            format: "monthAndDay"
        },
        selectedRange: {
            startValue: new Date(2011, 1, 5),
            endValue: new Date(2011, 2, 5)
        },
        title: "Select a Vacation Period"
    });
    
});