var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.showColon = true;
    $scope.data = companies[0];
    $scope.readOnly = false;
    $scope.labelLocation = "top";
    $scope.minColWidth = 300;
    $scope.colCount = 2;
    $scope.widthValue = undefined;
    
    $scope.formOptions = {    
        bindingOptions: {
            "formData.ID": "data.ID",
            "formData.CompanyName": "data.CompanyName",
            "formData.Address": "data.Address",
            "formData.City": "data.City",
            "formData.State": "data.State",
            "formData.Zipcode": "data.Zipcode",
            "formData.Phone": "data.Phone",
            "formData.Fax": "data.Fax",
            "formData.Website": "data.Website",
            readOnly: "readOnly",
            showColonAfterLabel: "showColon",
            labelLocation: "labelLocation",
            minColWidth: "minColWidth",
            colCount: "colCount",
            width: "widthValue"
        }
    };
    $scope.selectCompanyOptions = {
        displayExpr: "CompanyName",
        dataSource: companies,
        bindingOptions: {
            value: "data"
        }
    };
    $scope.readOnlyOptions = {
        text: "readOnly",
        bindingOptions: {
            value: "readOnly"
        }
    };
    $scope.showColonOptions = {
        text: "showColonAfterLabel",
        bindingOptions: {
            value: "showColon"
        }
    };
    $scope.labelLocationOptions = {
        items: ["left", "top"],
        bindingOptions: {
            value: "labelLocation"
        }
    };
    $scope.minColWidthOptions = {
        items: [150, 200, 300],
        bindingOptions: {
            value: "minColWidth"
        }
    };
    $scope.colCountOptions = {
        items: ["auto", 1, 2, 3],
        bindingOptions: {
            value: "colCount"
        }
    };
    $scope.widthOptions = {
        max: 550,
        bindingOptions: {
            value: "widthValue"
        }
    };
});