window.onload = function() {
    var startDate = new Date(1981, 3, 27),
        now = new Date();
    
    function dateDiff(date) {
        var diffInDay = Math.floor(Math.abs((new Date() - date)/(24*60*60*1000)));
        viewModel.diffInDay(diffInDay + " days");
    }
    
    var viewModel = {
        diffInDay: ko.observable(),
        dateFormat: {
            type: "date",
            value: now
        },
        timeFormat: {
            type: "time",
            value: now
        },
        dateTimeFormat: {
            type: "datetime",
            value: now
        },
        customFormat: {
            displayFormat: "EEEE, MMM dd",
            value: now
        },
        dateByPicker: {
            pickerType: "rollers",
            value: now
        },
        disabled: {
            type: "datetime",
            disabled: true,
            value: now
        },
        clear: {
            type: "time",
            showClearButton: true,
            value: new Date(2015, 12, 1, 6)
        },
        eventDateBoxOptions: {
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
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("date-box-demo"));
    
};