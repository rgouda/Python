import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { MedalsInfo, Service } from './app.service';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service]
})

export class AppComponent {
    olympicMedals: MedalsInfo[];

    constructor(service: Service) {
        this.olympicMedals = service.getMedalsData();
    }

    customizeLabel(arg) {
        return arg.valueText + " (" + arg.percentText + ")";
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