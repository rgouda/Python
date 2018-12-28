import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { DxSelectBoxModule } from 'devextreme-angular/ui/select-box';
import { MedalsInfo, Service } from './app.service';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service]
})

export class AppComponent {
    olympicMedals: MedalsInfo[];
    resolveOverlappingTypes = ["shift", "hide", "none"];

    constructor(service: Service) {
        this.olympicMedals = service.getMedalsData();
    }

    customizeLabel(arg) {
        return arg.argumentText + " ( " + arg.percentText + ")";
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxPieChartModule,
        DxSelectBoxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);