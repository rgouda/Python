$(function(){
    $("#range-selector").dxRangeSelector({
        dataSource: dataSource,
        margin: {
            top: 50
        },
        size: {
            height: 310
        },
        chart: {
            commonSeriesSettings: {
                argumentField: "year",
                valueField: "oil",
                type: "spline"
            },
            seriesTemplate: {
                nameField: "country",
                customizeSeries: function (valueFromNameField) {
                    return valueFromNameField === "USA" ? { color: "red" } : {};
                }
            }
        },
        title: "Select a Year Period"
    });
});