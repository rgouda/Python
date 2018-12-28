import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule } from 'devextreme-angular';
import { DatePipe } from '@angular/common';
import { Service } from './app.service';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service]
})
export class AppComponent {
    dataSource: any;

    constructor(private service: Service) {
        this.dataSource = {
            store: {
                type: 'array',
                key: 'ID',
                data: this.service.getOrders()
            }
        }
    }

    customizeDate(data) {
        return new DatePipe().transform(data.value, 'MMM dd, yyyy');
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