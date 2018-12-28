import { Injectable } from '@angular/core';

export class Employee {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    birthdate: Date;
}

let employees: Employee[] = [];

let surnames: string[] = [
    "Smith",
    "Johnson",
    "Brown",
    "Taylor",
    "Anderson",
    "Harris",
    "Clark",
    "Allen",
    "Scott",
    "Carter"];

let names: string[] = [
    "James",
    "John",
    "Robert",
    "Christopher",
    "George",
    "Mary",
    "Nancy",
    "Sandra",
    "Michelle",
    "Betty"];

let gender: string[] = ["Male", "Female"];

@Injectable()
export class Service {
    random() {
        let s: number = 55; 
        s = Math.sin(s) * 10000;
        return s - Math.floor(s);
    }

    generateData(count: number) {
        let i: number,
            startBirthDate = Date.parse("1/1/1975"),
            endBirthDate = Date.parse("1/1/1992");

        for (i = 0; i < count; i++) {
            let birthDate = new Date(startBirthDate + Math.floor(
                    this.random() * 
                    (endBirthDate - startBirthDate)));
            birthDate.setHours(12);
            
            let nameIndex = 
                Math.floor(this.random() * names.length);
            let item = {
                id: i + 1,
                firstName: names[nameIndex],
                lastName: surnames[Math.floor(this.random() * 
                surnames.length)],
                gender: gender[Math.floor(nameIndex / 5)],
                birthdate: birthDate
            };
            employees.push(item);
        }

        return employees;
    }
}