import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'devextreme/data/odata/store';
import { DxDataGridModule } from 'devextreme-angular';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    dataSource: any;

    constructor() {
        this.dataSource = {
            store: {
                type: 'odata',
                url: 'https://js.devexpress.com/Demos/DevAV/odata/Products'
            },
            select: [
                'Product_ID',
                'Product_Name',
                'Product_Cost',
                'Product_Sale_Price',
                'Product_Retail_Price',
                'Product_Current_Inventory'
            ],
            filter: ['Product_Current_Inventory', '>', 0]
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxDataGridModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);