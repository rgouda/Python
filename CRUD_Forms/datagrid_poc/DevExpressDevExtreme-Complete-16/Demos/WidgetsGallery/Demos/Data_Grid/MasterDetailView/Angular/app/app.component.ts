import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxTemplateModule } from 'devextreme-angular';
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
                data: this.service.getEmployees()
            }
        }
    }

    completedValue(rowData) {
        return rowData.Status == "Completed";
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxDataGridModule,
        DxTemplateModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);