window.onload = function() {
    var viewModel = {
    	gridOptions: {
    	    dataSource: {
    	        store: {
    	            type: "array",
    	            key: "ID",
    	            data: orders
    	        }
    	    },
    	    allowColumnReordering: true,
    	    allowColumnResizing: true,
    	    selection: {
    	        mode: "single"
    	    },
    	    filterRow: {
    	        visible: true
    	    },
    	    groupPanel: {
    	        visible: true
    	    },
    	    stateStoring: {
    	        enabled: true,
    	        type: "localStorage",
    	        storageKey: "storage"
    	    },
    	    pager: {
    	        showPageSizeSelector: true,
    	        allowedPageSizes: [5, 10, 20]
    	    },
    	    columns: [{
                dataField: "OrderNumber",
                width: 130,
                caption: "Invoice Number"
            }, {
                dataField: "OrderDate",
                dataType: "date",
                sortOrder: "desc"
            }, {
                dataField: "SaleAmount",
                alignment: "right",
                format: "currency"
            }, 
            "Employee", {
                caption: "City",
                dataField: "CustomerStoreCity"
            }, {
                caption: "State",
                dataField: "CustomerStoreState",
                groupIndex: 0
            }]
    	}
    };
    
    ko.applyBindings(viewModel, document.getElementById("grid"));
};