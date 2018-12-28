import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule } from 'devextreme-angular';

import { Service, Production } from './app.service';

@Component({
    selector: 'demo-app',
    providers: [Service],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    productionData: Production[];

    constructor(service: Service) {
        this.productionData = service.getProductionData();
    }

    customizeSeries(valueFromNameField: number) {
        return valueFromNameField === 2009 ? 
            { type: "line", label: { visible: true }, color: "#ff3f7a" } : {};
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