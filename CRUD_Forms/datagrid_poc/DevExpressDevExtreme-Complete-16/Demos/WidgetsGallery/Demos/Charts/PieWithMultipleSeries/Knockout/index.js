window.onload = function() {
    var viewModel = {
        chartOptions: {
            palette: "ocean",
            dataSource: dataSource,
            title: { 
                text: "Imports/Exports of Goods and Services",
                subtitle: {
                    text: "(billion US$, 2012)"
                }
            },
            legend: {
                visible: true
            },
            commonSeriesSettings: {
                type: "doughnut",
                innerRadius: 0.2,
                label: {
                    visible: false
                }
            },
            tooltip: {
                enabled: true,
                format: "currency",
                customizeTooltip: function() {
                    return { text: this.argumentText + "<br>" + this.seriesName + ": " + this.valueText + "B" };
                }
            },
            "export": {
                enabled: true
            },
            series: [{
                name: "Export",
                argumentField: "Country",
                valueField: "Export",
            }, {
                name: "Import",
                argumentField: "Country",
                valueField: "Import"
            }]
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("chart-demo"));
};