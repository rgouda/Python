import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxFormModule } from 'devextreme-angular';

import { Employee, Service } from './app.service';
@Component({
    selector: 'demo-app',
    providers: [ Service ],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    employee: Employee;
    formItems: any[];
   
    constructor( service: Service ) { 
        this.employee = service.getEmployee();
        this.formItems = [{
            itemType: 'group',
            caption: 'System Information',
            items: ['ID', 'FirstName', 'LastName', 'HireDate', 'Position', 'OfficeNo']
        }, {
            itemType: 'group',
            caption: 'Personal Data',
            items: ['BirthDate', {
                itemType: 'group',
                caption: 'Home Address',
                items: ['Address', 'City', 'State', 'Zipcode']
            }]
        }, {
            itemType: 'group',
            caption: 'Contact Information',
            items: [{
                itemType: 'tabbed',
                tabPanelOptions: {
                    deferRendering: false
                },
                tabs: [{
                    title: 'Phone',
                    items: ['Phone']
                }, {
                    title: 'Skype',
                    items: ['Skype']
                }, {
                    title: 'Email',
                    items: ['Email']
                }]
            }]
        }];
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxFormModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
