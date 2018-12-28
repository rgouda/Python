$(function(){
    $("#gridContainer").dxDataGrid({
        dataSource: {
            store: {
                type: "array",
                key: "ID",
                data: employees
            }
        },
        columns: [{
                dataField: "Prefix",
                caption: "Title",
                width: 70
            },
            "FirstName",
            "LastName", {
                dataField: "Position",
                width: 170
            }, {
                dataField: "State",
                width: 125
            }, {
                dataField: "BirthDate",
                dataType: "date"
            }
        ],
        masterDetail: {
            enabled: true,
            template: function(container, options) { 
                var currentEmployeeData = options.data;
                container.addClass("internal-grid-container");
                $("<div>").text(currentEmployeeData.FirstName + " " + currentEmployeeData.LastName + " Tasks:").appendTo(container);            
                $("<div>")
                    .addClass("internal-grid")
                    .dxDataGrid({
                        columnAutoWidth: true,
                        columns: ["Subject", {
                            dataField: "StartDate",
                            dataType: "date"
                        }, {
                            dataField: "DueDate",
                            dataType: "date"
                        }, "Priority", {
                            caption: "Completed",
                            dataType: "boolean",
                            calculateCellValue: function(rowData) {
                                return rowData.Status == "Completed";
                            }
                        }],
                        dataSource: currentEmployeeData.Tasks
                    }).appendTo(container);
            }
        }
    });
});