$(function(){
    var rangeOptions = {
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
    
            $.each(data, function(i, item){
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
    
            $("#total").text(Globalize.formatNumber(total, { maximumFractionDigits: 0 }));
        }
    };
    
    $("#range").dxRangeSelector(rangeOptions);
    
    $("#total").text("16,254,000");
});