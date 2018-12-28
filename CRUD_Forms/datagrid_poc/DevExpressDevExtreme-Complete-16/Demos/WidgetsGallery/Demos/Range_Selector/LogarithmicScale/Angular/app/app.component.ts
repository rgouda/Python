import { NgModule, Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxRangeSelectorModule, DxChartModule, DxChartComponent } from 'devextreme-angular';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    @ViewChild(DxChartComponent) chart: DxChartComponent;    
    dataSource: any[] = [];

    constructor() {
        let max = 100;
        
        for (let i = 0; i < max; i++) {
            this.dataSource.push({ 
                arg: Math.pow(10, i * 0.1), 
                val: Math.log(i + 1) / Math.log(0.5) + (Math.random() - 0.5) * (100 / (i + 1)) + 10 
            });
        }
    }
    onSelectedRangeChanged($event) {
        this.chart.instance.zoomArgument($event.startValue, $event.endValue);
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxRangeSelectorModule,
        DxChartModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);