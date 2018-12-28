import { NgModule, Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridComponent, DxDataGridModule, DxCheckBoxModule } from 'devextreme-angular';

import { Employee, Service } from './app.service';

@Component({
    selector: 'demo-app',
    providers: [ Service ],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})

export class AppComponent {
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    employees: Employee[];
    positionDisableSorting: boolean = false;

    constructor(service: Service) {
        this.employees = service.getEmployees();
    }

    onValueChange(e){
        if(e.value) {
            this.dataGrid.instance.columnOption(5, "sortOrder", undefined);
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxDataGridModule,
        DxCheckBoxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
