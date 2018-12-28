window.onload = function() {
    var selectedItemsText = ko.observable("Nobody has been selected"),
        selectedPrefix = ko.observable(null),
        clearButtonDisabled = ko.observable(false);
        
    var viewModel = {
        selectedItemsText: selectedItemsText,
        gridOptions: {
            dataSource: employees,
            selection: {
                mode: "multiple"
            },
            columns: [{
                    dataField: "Prefix",
                    caption: "Title",
                    width: 70
                },
                "FirstName",
                "LastName", {
                    dataField: "Position",
                    width: 180
                }, {
                    dataField: "BirthDate",
                    dataType: "date"
                }, {
                    dataField: "HireDate",
                    dataType: "date"
                }
            ],
            onSelectionChanged: function(selectedItems) {
                var data = selectedItems.selectedRowsData;
    
                if(data.length > 0)
                    selectedItemsText($.map(data, function(value) {
                        return value.FirstName + " " + value.LastName;
                    }).join(", "));
                else 
                    selectedItemsText("Nobody has been selected");
    
                selectedPrefix(null);
                clearButtonDisabled(!data.length);
            }
        },
        selectPrefixOptions: {
            dataSource: ["All", "Dr.", "Mr.", "Mrs.", "Ms."],
            placeholder: "Select title",
            value: selectedPrefix,
            onValueChanged: function (data) {
                var dataGrid = $("#grid-container").dxDataGrid("instance"); 
    
                if(!data.value)
                    return;
    
                if (data.value == "All") {
                    dataGrid.selectAll();
                } else {
                    var employeesToSelect = $.map(dataGrid.option("dataSource"), function(item) {
                        if(item.Prefix === data.value)
                            return item;
                    });
                    dataGrid.selectRows(employeesToSelect);
                }
    
                selectedPrefix(data.value);
            }
        },
        clearButtonOptions: {
            text: "Clear Selection",
            disabled: clearButtonDisabled,
            onClick: function () {
                $("#grid-container").dxDataGrid("instance").clearSelection();
            }
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("grid"));
};