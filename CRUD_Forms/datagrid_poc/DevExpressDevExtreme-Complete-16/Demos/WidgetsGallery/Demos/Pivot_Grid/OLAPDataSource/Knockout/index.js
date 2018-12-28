window.onload = function() {
    var viewModel = {
        pivotGridOptions: {
            allowSortingBySummary: true,
            allowSorting: true,
            allowFiltering: true,
            allowExpandAll: true,
            height: 480,
            showBorders: true,
            "export": {
                enabled: true,
                fileName: "Adventure Works"
            }, 
            dataSource: {
                fields: [
                    { dataField: "[Product].[Category]", area: "row" },
                    { dataField: "[Product].[Subcategory]", area: "row" },
                    { dataField: "[Ship Date].[Calendar Year]", area: "column" },
                    { dataField: "[Ship Date].[Month of Year]", area: "column" },
                    { dataField: "[Measures].[Customer Count]", area: "data" }
                ],
                store: {
                    type: "xmla",
                    url: "https://demos.devexpress.com/Services/OLAP/msmdpump.dll",
                    catalog: "Adventure Works DW Standard Edition",
                    cube: "Adventure Works"
                }
            }
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("pivotgrid"));
};