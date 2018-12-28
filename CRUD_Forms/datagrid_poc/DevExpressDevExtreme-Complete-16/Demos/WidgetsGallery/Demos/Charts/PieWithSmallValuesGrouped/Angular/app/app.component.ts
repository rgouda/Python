import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPieChartModule } from 'devextreme-angular/ui/pie-chart';
import { LanguageData, Service } from './app.service';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service]
})

export class AppComponent {
    internetLanguages: LanguageData[];

    constructor(service: Service) {
        this.internetLanguages = service.getLanguagesData();
    }

    customizeLabel(point) {
        return point.argumentText + ": " + point.valueText + "%";
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