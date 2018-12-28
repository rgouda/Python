$(function(){
    function logEvent(eventName) {
        var el = $("#eventContainer .eventLog"),
            value = el.text();
        value += ((value && ", ") + eventName);
        el.text(value);
    }
    
    $("#gridContainer").dxDataGrid({
        dataSource: employees,
        paging: {
            enabled: false
        },
        editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        }, 
        columns: [
            {
                dataField: "Prefix",
                caption: "Title"
            }, "FirstName",
            "LastName", {
                dataField: "Position",
                width: 130
            }, {
                dataField: "StateID",
                caption: "State",
                width: 125,
                lookup: {
                    dataSource: states,
                    displayExpr: "Name",
                    valueExpr: "ID"
                }
            }, {
                dataField: "BirthDate",
                dataType: "date",
                width: 125
            },     
        ],
        onEditingStart: function(e) {
            logEvent("EditingStart");
        },
        onInitNewRow: function(e) {
            logEvent("InitNewRow");
        },
        onRowInserting: function(e) {
            logEvent("RowInserting");
        },
        onRowInserted: function(e) {
            logEvent("RowInserted");
        },
        onRowUpdating: function(e) {
            logEvent("RowUpdating");
        },
        onRowUpdated: function(e) {
            logEvent("RowUpdated");
        },
        onRowRemoving: function(e) {
            logEvent("RowRemoving");
        },
        onRowRemoved: function(e) {
            logEvent("RowRemoved");
        }
    });
    
    
    $("#clearLog").dxButton({
        text: "Clear",
        onClick: function() {
            $("#eventContainer .eventLog").empty();
        }
    });
});