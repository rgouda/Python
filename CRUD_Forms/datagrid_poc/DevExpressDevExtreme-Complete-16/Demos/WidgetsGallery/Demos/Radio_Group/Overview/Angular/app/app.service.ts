import { Injectable } from '@angular/core';

export class Task {
    id: number;
    subject: string;
    assignedEmployeeId: number;
    priorityIndex: number;
}

let tasks: Product[] = [{
    id: 1,
    subject: "Choose between PPO and HMO Health Plan",
    assignedEmployeeId: 1,
    priorityIndex: 3
}, {
    id: 2,
    subject: "Non-Compete Agreements",
    assignedEmployeeId: 2,
    priorityIndex: 0   
}, {
    id: 3,
    subject: "Comment on Revenue Projections",
    assignedEmployeeId: 2,
    priorityIndex: 1   
}, {
    id: 4,
    subject: "Sign Updated NDA",
    assignedEmployeeId: 3,
    priorityIndex: 2   
}, {
    id: 5,
    subject: "Submit Questions Regarding New NDA",
    assignedEmployeeId: 6,
    priorityIndex: 3  
}, {
    id: 6,
    subject: "Rollout of New Website and Marketing Brochures",
    assignedEmployeeId: 22,
    priorityIndex: 3   
}];

@Injectable()
export class Service {
    getTasks(): Task[] {
        return tasks;
    }
}