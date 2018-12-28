import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxCheckBoxModule, DxGalleryModule } from 'devextreme-angular';

import { Service } from './app.service';

@Component({
    selector: 'demo-app',
    providers: [Service],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    dataSource: string[];
    slideshowDelay: number = 2000;
    constructor(service: Service) {
        this.dataSource = service.getImages();
    }
    valueChanged(e) {
        this.slideshowDelay = e.value ? 2000 : 0;
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxCheckBoxModule,
        DxGalleryModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);