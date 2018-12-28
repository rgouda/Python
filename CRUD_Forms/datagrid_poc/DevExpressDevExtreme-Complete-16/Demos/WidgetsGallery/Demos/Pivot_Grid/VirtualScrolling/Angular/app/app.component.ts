import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPivotGridModule } from 'devextreme-angular';
import { Service } from './app.service';

import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

@Component({
  selector: 'demo-app',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [Service]
})
export class AppComponent {
  pivotGridDataSource: any;

  constructor(service: Service) {
    this.pivotGridDataSource = {
      fields: [{
        caption: "Region",
        width: 120,
        dataField: "region",
        area: "row",
        expanded: true
      }, {
        caption: "City",
        dataField: "city",
        width: 150,
        area: "row"
      }, {
        dataField: "date",
        dataType: "date",
        area: "column"
      }, {
        groupName: "date",
        groupInterval: "year",
        expanded: true
      }, {
        groupName: "date",
        groupInterval: "quarter",
        expanded: true
      }, {
        caption: "Total",
        dataField: "amount",
        dataType: "number",
        summaryType: "sum",
        format: "currency",
        area: "data"
      }],
      store: service.getSales()
    }
  }
}

@NgModule({
  imports: [
    BrowserModule,
    DxPivotGridModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);