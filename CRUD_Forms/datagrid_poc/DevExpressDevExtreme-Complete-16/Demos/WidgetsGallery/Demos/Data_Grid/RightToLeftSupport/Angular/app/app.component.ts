import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule,
         DxSelectBoxModule,
         DxTemplateModule } from 'devextreme-angular';
import { Service, EuropeanUnion } from './app.service';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service]
})
export class AppComponent {
    dataSource: EuropeanUnion[];
    placeholder: string = "Search...";
    rtlEnabled: boolean = false;
    languages: string[] = ["Arabic (Right-to-Left direction)", "English (Left-to-Right direction)"];

    constructor(service: Service) {
        this.dataSource = service.getEuropeanUnion();
    }
    selectLanguage(data) {
        this.rtlEnabled = data.value === this.languages[0];
        this.placeholder = this.rtlEnabled ? 'بحث' : 'Search...';
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxDataGridModule,
        DxSelectBoxModule,
        DxTemplateModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);