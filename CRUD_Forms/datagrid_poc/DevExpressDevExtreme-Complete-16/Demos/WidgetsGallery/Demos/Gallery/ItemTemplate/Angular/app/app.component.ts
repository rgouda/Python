import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxTemplateModule, DxGalleryModule } from 'devextreme-angular';

import { Service, House } from './app.service';

@Component({
    selector: 'demo-app',
    providers: [Service],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    dataSource: House[];

    constructor(service: Service) {
        this.dataSource = service.getHouses();
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxTemplateModule,
        DxGalleryModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);