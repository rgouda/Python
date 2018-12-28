$(function(){
    $("#gridContainer").dxDataGrid({
        dataSource: employees,
        selection: {
            mode: "single"
        },
        hoverStateEnabled: true,
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
            caption: "BirthDate",
            dataType: "date"
        }, {
            dataField: "HireDate",
            dataType: "date"
        }],
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if(data) {
                $(".employeeNotes").text(data.Notes);
                $(".employeePhoto").attr("src", data.Picture);
            }
        }
    });
});