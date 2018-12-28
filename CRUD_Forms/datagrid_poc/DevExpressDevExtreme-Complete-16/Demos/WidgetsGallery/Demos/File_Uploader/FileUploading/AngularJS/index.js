var DemoApp = angular.module('DemoApp', ['dx']);

DemoApp.controller('DemoController', function DemoController($scope) {
    $scope.multiple = false;
    $scope.accept = "*";
    $scope.value = [];
    $scope.uploadMode = "instantly";
    
    $scope.options = {
        uploadUrl: "https://js.devexpress.com/Content/Services/upload.aspx",
        bindingOptions: {
            multiple: "multiple",
            accept: "accept",
            value: "value",
            uploadMode: "uploadMode"
        }
    };
    
    $scope.acceptOptions = {
        dataSource: [
            {name: "All types", value: "*"}, 
            {name: "Images", value: "image/*"}, 
            {name: "Videos", value: "video/*"}
        ],
        valueExpr: "value",
        displayExpr: "name",
        width: 200,
        bindingOptions: {
            value: "accept"
        }
    };
    
    $scope.uploadOptions = {
        items: ["instantly", "useButtons"],
        width: 200,
        bindingOptions: {
            value: "uploadMode"
        }
    };
    
});