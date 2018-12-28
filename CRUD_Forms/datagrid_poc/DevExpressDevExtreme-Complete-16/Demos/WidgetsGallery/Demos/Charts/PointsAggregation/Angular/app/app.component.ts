import { NgModule, Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartModule, DxChartComponent, DxRangeSelectorModule } from 'devextreme-angular';

import { Service, Coordinate } from './app.service';

@Component({
    selector: 'demo-app',
    providers: [Service],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    @ViewChild(DxChartComponent) chart: DxChartComponent;
    coordinates: Coordinate[];

    constructor(service: Service) {
        this.coordinates = service.getCoordinates();
    }

    selectedRangeChanged(arg: any) {
        this.chart.instance.zoomArgument(arg.startValue, arg.endValue);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxChartModule,
        DxRangeSelectorModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);