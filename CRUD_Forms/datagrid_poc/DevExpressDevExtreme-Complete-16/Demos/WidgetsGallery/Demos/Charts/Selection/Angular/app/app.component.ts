import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule } from 'devextreme-angular';

import { Service, ExportData } from './app.service';

@Component({
    selector: 'demo-app',
    providers: [Service],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    exportData: ExportData[];

    constructor(service: Service) {
        this.exportData = service.getExportData();
    }

    pointClick(e: any) {
        e.target.select();
    }

    legendClick(e: any) {
        var series = e.target;
        if(series.isVisible()) { 
            series.hide();
        } else {
            series.show();
        }
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxChartModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);