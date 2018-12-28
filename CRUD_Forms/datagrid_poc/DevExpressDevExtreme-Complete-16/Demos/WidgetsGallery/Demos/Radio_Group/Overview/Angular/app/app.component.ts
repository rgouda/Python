import { NgModule, Component, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxRadioGroupModule, DxRadioGroupComponent, DxTemplateModule } from 'devextreme-angular';
import data from "devextreme/data/array_store";

import { Service, Task } from './app.service';

@Component({
    selector: 'demo-app',
    providers: [Service],
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css']
})
export class AppComponent {
    @ViewChild("customizedRadioGroup") customizedRadioGroup: DxRadioGroupComponent;
    @ViewChild("eventRadioGroup") eventRadioGroup: DxRadioGroupComponent;
  
    priorities: string[];
    tasks: Task[];
    data: any;
    currentData: string[] = [];
  
    constructor(service: Service) {
        this.tasks = service.getTasks();
        this.priorities = [
            "Low", 
            "Normal", 
            "Urgent", 
            "High"
        ];
        this.currentData[0] = this.tasks[1].subject;
    }
  
    ngOnInit() {
        this.data = new data({ 
            data: this.tasks,
            key: "ID"
        });
    }
    ngAfterViewInit(){
        let items = this.customizedRadioGroup.element.nativeElement.getElementsByClassName("dx-radiobutton");
        for (let i = 0; i < 4; i++){
            items[i].classList.add(this.priorities[i].toLowerCase());
        }
    
        this.eventRadioGroup.instance.option("value", this.priorities[0]);
    }
  
    onValueChanged($event){
        this.currentData = [];
    
        this.tasks.forEach((item, index) => {
            if(this.priorities[item.priorityIndex] == $event.value){
                this.currentData.push(this.tasks[index].subject);
            }
        });    
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxRadioGroupModule,
        DxTemplateModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);