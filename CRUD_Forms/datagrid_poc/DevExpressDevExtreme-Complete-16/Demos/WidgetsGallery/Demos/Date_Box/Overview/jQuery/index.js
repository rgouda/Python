$(function(){
    var now = new Date();
    
    $("#date").dxDateBox({
        type: "date",
        value: now
    });
    
    $("#time").dxDateBox({
        type: "time",
        value: now
    });
    
    $("#date-time").dxDateBox({
        type: "datetime",
        value: now
    });
    
    $("#custom").dxDateBox({
        displayFormat: "EEEE, MMM dd",
        value: now
    });
    
    $("#date-by-picker").dxDateBox({
        pickerType: "rollers",
        value: now
    });
    
    $("#disabled").dxDateBox({
        type: "datetime",
        disabled: true,
        value: now
    });
    
    $("#clear").dxDateBox({
        type: "time",
        showClearButton: true,
        value: new Date(2015, 12, 1, 6)
    });
    
    var startDate = new Date(1981, 3, 27);
    
    $("#birthday").dxDateBox({
        applyValueMode: "useButtons",
        value: startDate,
        max: new Date(),
        min: new Date(1900, 0, 1),
        onContentReady: function() {
            dateDiff(startDate);
        },
        onValueChanged: function(data) {
            dateDiff(new Date(data.value));
        }
    });
    
    function dateDiff(secondDate) {
        var diffInDay = Math.floor(Math.abs((new Date() - secondDate)/(24*60*60*1000)));
        return $("#age").text(diffInDay + " days");
    }
    
});