import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDateBoxModule } from 'devextreme-angular';
import 'devextreme-intl';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})

export class AppComponent {
    startDate: Date = new Date(1981, 3, 27);
    now: Date = new Date();
    min: Date = new Date(1900, 0, 1);
    dateClear = new Date(2015, 12, 1, 6);
    diffInDay: string = "";

    constructor() {
        this.dateDiff(this.startDate);
    }
    dateDiff(date) {
        var diffInDay = Math.floor(Math.abs((new Date() - date)/(24*60*60*1000)));
        this.diffInDay = diffInDay + " days";
    }
    onContentReady() {
        this.dateDiff(this.startDate);
    }
    onValueChanged(data) {
        this.dateDiff(new Date(data.value));
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxDateBoxModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);