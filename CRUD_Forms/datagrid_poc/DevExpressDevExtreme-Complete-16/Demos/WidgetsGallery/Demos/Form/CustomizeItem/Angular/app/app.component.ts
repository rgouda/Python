import { NgModule, Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxSelectBoxModule,
         DxTextAreaModule,
         DxFormModule,
         DxFormComponent } from 'devextreme-angular';

import { Employee, Service } from './app.service';

@Component({
    selector: 'demo-app',
    providers: [ Service ],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})

export class AppComponent implements AfterViewInit {
    @ViewChild(DxFormComponent) myform: DxFormComponent;
    employee: Employee;
    positions: string[];
    rules: Object;
    formItems: any[];

    constructor(service: Service) {
        this.employee = service.getEmployee();
        this.positions = service.getPositions();
        this.rules = {
            'X': /[02-9]/
        };
        this.formItems = [
            'ID', {
                dataField: 'FirstName',
                editorOptions: {
                    disabled: true
                }
            }, {
                dataField: 'LastName',
                editorOptions: {
                    disabled: true
                }
            }, {
                dataField: 'Position',
                editorType: 'dxSelectBox',
                editorOptions: {
                    items: this.positions,
                    value: ''
                },
                validationRules: [{
                    type: 'required',
                    message: 'Position is required'
                }]
            }, {
                dataField: 'BirthDate',
                editorType: 'dxDateBox',
                editorOptions: {
                    disabled: true
                }
            }, {
                dataField: 'HireDate',
                editorType: 'dxDateBox',
                editorOptions: {
                    value: null
                },
                validationRules: [{
                    type: 'required',
                    message: 'Hire date is required'
                }]
            }, {
                colSpan: 2,
                dataField: 'Notes',
                editorType: 'dxTextArea',
                editorOptions: {
                    height: 90
                }
            },
            'Address', {
                dataField: 'Phone',
                editorOptions: {
                    mask: '+1 (X00) 000-0000',
                    maskRules: this.rules
                }
            }
        ];
    }

    ngAfterViewInit() {
        this.myform.instance.validate()
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxSelectBoxModule,
        DxTextAreaModule,
        DxFormModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
