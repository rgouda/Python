$(function(){
    var dataGrid,
        selectedItemsDataGrid,
        changedBySelectBox;
    
    dataGrid = $("#grid-container").dxDataGrid({
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
                $("#selectedItemsContainer").text(
                $.map(data, function(value) {
                    return value.FirstName + " " + value.LastName;
                }).join(", "));
            else 
                $("#selectedItemsContainer").text("Nobody has been selected");
            if(!changedBySelectBox)
                $("#select-prefix").data("dxSelectBox").option("value", null);
    
            changedBySelectBox = false;
            clearButton.option("disabled", !data.length);
        }
    }).dxDataGrid("instance");
    
    $("#select-prefix").dxSelectBox({
        dataSource: ["All", "Dr.", "Mr.", "Mrs.", "Ms."],
        placeholder: "Select title",
        onValueChanged: function (data) {
            if(!data.value)
                return;
            changedBySelectBox = true;
            if (data.value == "All") {
                dataGrid.selectAll();
            } else {
                var employeesToSelect = $.map(dataGrid.option("dataSource"), function(item) {
                    if(item.Prefix === data.value)
                        return item;
                });
                dataGrid.selectRows(employeesToSelect);
            }
        }
    });
    
    var clearButton = $("#gridClearSelection").dxButton({
        text: "Clear Selection",
        disabled: true,
        onClick: function () {
            dataGrid.clearSelection();
        }
    }).dxButton("instance");
});