import { NgModule, Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPivotGridModule } from 'devextreme-angular';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    dataSource: any;

    constructor() {
        this.dataSource = {
            fields: [
                { dataField: '[Product].[Category]', area: 'row' },
                { dataField: '[Product].[Subcategory]', area: 'row' },
                { dataField: '[Ship Date].[Calendar Year]', area: 'column' },
                { dataField: '[Ship Date].[Month of Year]', area: 'column' },
                { dataField: '[Measures].[Customer Count]', area: 'data' }
            ],
            store: {
                type: 'xmla',
                url: 'https://demos.devexpress.com/Services/OLAP/msmdpump.dll',
                catalog: 'Adventure Works DW Standard Edition',
                cube: 'Adventure Works'
            }
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxPivotGridModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);