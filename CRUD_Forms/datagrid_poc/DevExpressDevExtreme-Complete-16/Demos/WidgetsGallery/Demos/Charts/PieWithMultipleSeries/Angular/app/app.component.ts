import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { ExportImportEntry, Service } from './app.service';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service]
})

export class AppComponent {
    exportImportData: ExportImportEntry[];

    constructor(service: Service) {
        this.exportImportData = service.getExportImportData();
    }

    customizeTooltip(arg) {
        return { text: arg.argumentText + "<br>" + arg.seriesName + ": " + arg.valueText + "B" };
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxPieChartModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);