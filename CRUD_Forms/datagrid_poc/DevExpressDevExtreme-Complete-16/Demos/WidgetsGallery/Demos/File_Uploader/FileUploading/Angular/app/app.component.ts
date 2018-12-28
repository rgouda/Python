import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxCheckBoxModule, DxFileUploaderModule, DxSelectBoxModule } from 'devextreme-angular';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent { 
    value: any[] = [];
}

@NgModule({
    imports: [
        BrowserModule,
        DxCheckBoxModule,
        DxFileUploaderModule,
        DxSelectBoxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);