$(function(){
    $("#gridContainer").dxDataGrid({
        dataSource: {
            store: {
                type: "array",
                key: "ID",
                data: orders
            }
        },
        selection: {
            mode: "single"
        },
        columns: [{
                dataField: "OrderNumber",
                width: 130,
                caption: "Invoice Number"
            }, {
                dataField: "OrderDate",
                dataType: "date",
            }, {
                dataField: "Employee",
                groupIndex: 0
            }, {
                caption: "City",
                dataField: "CustomerStoreCity"
            }, {
                caption: "State",
                dataField: "CustomerStoreState",
            }, {
                dataField: "SaleAmount",
                alignment: "right",
                format: "currency"
            }, {
                dataField: "TotalAmount",
                alignment: "right",
                format: "currency"
            }
        ],
        sortByGroupSummaryInfo: [{
            summaryItem: "count"
        }],
        summary: {
            groupItems: [{
                column: "OrderNumber",
                summaryType: "count",
                displayFormat: "{0} orders",
            }, {
                column: "SaleAmount",
                summaryType: "max",
                valueFormat: "currency",
                showInGroupFooter: false,
                alignByColumn: true
            }, {
                column: "TotalAmount",
                summaryType: "max",
                valueFormat: "currency",
                showInGroupFooter: false,
                alignByColumn: true
            }, {
                column: "TotalAmount",
                summaryType: "sum",
                valueFormat: "currency",
                displayFormat: "Total: {0}",
                showInGroupFooter: true
            }]
        }
    });
});