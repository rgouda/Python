import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { OilPrice, Service } from './app.service';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service]
})

export class AppComponent {
    oilPrices: OilPrice[];

    constructor(service: Service) {
        this.oilPrices = service.getOilPrices();
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