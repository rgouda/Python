window.onload = function() {
    function clearEvents() {
        viewModel.events("");
    }
    
    function logEvent(eventName) {
        viewModel.events(viewModel.events() +  (viewModel.events() && ", ") + eventName);
    }
    
    var viewModel = {
        events: ko.observable(""),
        dataGridOptions: {
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
                }, 
                "FirstName",
                "LastName",
                {
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
        },
        buttonOptions: {
            text: "Clear",
            onClick: function() {
                clearEvents();
            }
        }
    };
    
    ko.applyBindings(viewModel, document.getElementById("data-grid-demo"));
};