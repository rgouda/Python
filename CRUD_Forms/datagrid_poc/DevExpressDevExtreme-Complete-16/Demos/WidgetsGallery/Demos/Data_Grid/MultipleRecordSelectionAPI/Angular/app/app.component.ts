import { NgModule, Component, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxDataGridModule, DxButtonModule, DxSelectBoxModule } from 'devextreme-angular';
import { Service, Employee } from './app.service';

@Component({
    selector: 'demo-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    providers: [Service]
})
export class AppComponent {
    employees: Employee[];
    prefix: string;
    selectedRows: Employee[];
    selectionChangedBySelectbox: boolean;

    constructor(service: Service) {
        this.employees = service.getEmployees();
    }

    filterSelected(event) {
        this.selectionChangedBySelectbox = true;
    
        let prefix = event.value;
    
        if(!prefix)
            return;
        else if(prefix === "All")
            this.selectedRows = this.employees;
        else
            this.selectedRows = this.employees.filter(employe => employe.Prefix === prefix);
      
        this.prefix = prefix;
    }
  
    selectionChangedHandler() {
        if(!this.selectionChangedBySelectbox) {
            this.prefix=null;
        }
    
        this.selectionChangedBySelectbox=false; 
    }
}

@Pipe({ name: 'stringifyEmplyees' })
export class StringifyEmployeesPipe implements PipeTransform {
    transform(employees: Employee[]) {
        return employees.map(employee =>  employee.FirstName + " " + employee.LastName ).join(", ");
    }
}


@NgModule({
    imports: [
        BrowserModule,
        DxDataGridModule,
        DxButtonModule,
        DxSelectBoxModule
    ],
    declarations: [AppComponent, StringifyEmployeesPipe],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);