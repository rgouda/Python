import { NgModule, Component, ViewChild, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxChartModule, DxChartComponent, DxSelectBoxModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import 'devextreme/data/odata/store';

import { Month, Service } from './app.service';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service]
})
export class AppComponent implements AfterViewInit {
    @ViewChild(DxChartComponent) chart: DxChartComponent

    months: Month[];
    monthDataStore: any;
    min: number;
    max: number;
    highest: number;
    lowest: number;
    average: number;
    seriesColor: string;

    constructor(service: Service) {
        this.months = service.getMonths();
    }

    ngAfterViewInit() {
        this.monthDataStore = new DataSource({
            store: {
                type: 'odata',
                url: 'https://js.devexpress.com/Demos/WidgetsGallery/odata/WeatherItems',
                onLoaded: (results) => {
                    let data = results[0];

                    this.chart.dataSource = data.DayItems;
                    this.chart.title = 'Temperature in Barcelona: ' +
                        data.Name.substr(0, 1).toUpperCase() +
                        data.Name.substr(1) + ' 2012';
                    this.seriesColor = data.Color;
                    this.min = data.RecordLow - 1;
                    this.max = data.RecordHigh + 1;
                    this.highest = data.RecordHigh;
                    this.lowest = data.RecordLow;
                    this.average = data.Average;
                }
            },
            expand: 'DayItems'
        });
        this.changeMonthData(1);
    }
    customizeTooltip(arg) {
        return {
            text: arg.valueText + '&#176C'
        };
    }
    customizeText(arg) {
        return arg.valueText + '&#176C';
    }
    onValueChanged(data) {
        this.changeMonthData(data.value);
    }
    changeMonthData(monthId) {
        this.monthDataStore.filter(['Id', '=', monthId]);
        this.monthDataStore.load();
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxChartModule,
        DxSelectBoxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);