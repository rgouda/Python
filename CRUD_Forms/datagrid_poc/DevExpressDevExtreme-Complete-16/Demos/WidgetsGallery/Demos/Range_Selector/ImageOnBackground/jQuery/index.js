$(function(){
    var width = $("#range-selector").width();
    
    $("#range-selector").dxRangeSelector({
        margin: {
            top: 50,
            bottom: 0
        },
        size: {
            height: (width - 140) / 4 + 100
        },
        background: {
            image: {
                url: "https://js.devexpress.com/Demos/VizGallery/images/RangeImage.png",
                location: "full"
            }
        },
        indent: {
            left: 65,
            right: 65
        },
        sliderMarker: {
            placeholderHeight: 30,
            format: "shorttime"
        },
        scale: {
            startValue: new Date(2012, 8, 29, 0, 0, 0),
            endValue: new Date(2012, 8, 29, 24, 0, 0),
            minorTickInterval: "hour",
            placeholderHeight: 20,
            label: { format: "shorttime" }
        },
        selectedRange: {
            startValue: new Date(2012, 8, 29, 11, 0, 0),
            endValue: new Date(2012, 8, 29, 17, 0, 0)
        },
        title: "Select a Time Period"
    });
});