$(function(){
    $("#gridContainer").dxDataGrid({
        dataSource: employees,
        rowTemplate: function(container, item) {
            var data = item.data,
                markup = "<tbody class='employee " + ((item.rowIndex % 2) ? 'dx-row-alt' : '') + "'>" +
                    "<tr class='dx-row main-row'>" +
                    "<td rowspan='2'><img src='" + data.Picture + "' /></td>" +
                    "<td>" + data.Prefix + "</td>" +
                    "<td>" + data.FirstName + "</td>" +
                    "<td>" + data.LastName + "</td>" +
                    "<td>" + data.Position + "</td>" +
                    "<td>" + Globalize.formatDate(new Date(data.BirthDate), { raw: "yyyy/MM/dd" }) + "</td>" +
                    "<td>" + Globalize.formatDate(new Date(data.HireDate), { raw: "yyyy/MM/dd" }) + "</td>" +
                "</tr>" +
                "<tr class='notes-row'>" +
                    "<td colspan='6'><div>" + data.Notes + "</div></td>" +
                "</tr>" +
            "</tbody>";
    
            container.append(markup);
        },
        columnWidth: "auto",
        columns: [{
                dataField: "Photo",
                width: 100,
                allowFiltering: false,
                allowSorting: false
            }, {
                dataField: "Prefix",
                caption: "Title",
                width: 70
            },
            "FirstName",
            "LastName", 
            "Position", {
                dataField: "BirthDate",
                dataType: "date"
            }, {
                dataField: "HireDate",
                dataType: "date"
            }
        ]
    });
    
});