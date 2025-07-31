import { Injectable } from '@angular/core';
import { EmployeeData } from '../model/employee.model';
import { last } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employee: EmployeeData[] = [];

  groups = [
    'Human Resources (HR)',
    'Finance / Accounting',
    'Marketing',
    'Sales / Business Development',
    'IT / Information Technology',
    'Operations / Production',
    'Customer Service / Support',
    'Research & Development (R&D)',
    'Procurement / Purchasing',
    'Legal & Compliance'
  ];

  constructor(){
    const local = localStorage.getItem('employee')
    if (local){
      this.employee = JSON.parse(local);
    } else {
      for (let i = 1; i<=100; i++){
        this.employee.push({
          id:i,
          username: `username${i}`,
          firstName: `first${i}`,
          lastName: `last${i}`,
          email: `username${i}@gmail.com`,
          birthDate: new Date(1990 + (i % 30), i % 12, (i % 28) + 1),
          basicSalary: getRandomSalary(),
          status: (i % 2 === 0) ? 'Aktif' : 'Nonaktif',
          group: this.getRandomGroup(),
          description: new Date(1990 + (i % 30), i % 12, (i % 28) + 1)
        });
      }
      this.saveToLocal();
    }
  }

  saveToLocal(){
    localStorage.setItem('employee', JSON.stringify(this.employee));
  }

  getEmployee(): EmployeeData[]{
    return this.employee;
  }

  getGroup() {
    return this.groups;
  }

  private getRandomGroup(): string {
    const idx = Math.floor(Math.random() * this.groups.length);
    return this.groups[idx];
  }

  addEmployee(employeeData: EmployeeData){
    const lastIndex: number =  this.employee.length; 
    employeeData.id = this.employee[lastIndex-1].id + 1;
    this.employee.push(employeeData);
    this.saveToLocal();
  }

  deleteEmployee(id: number){
    this.employee = this.employee.filter(em => em.id !== id);
    this.saveToLocal();
  }

  updateEmployee(employeeData: EmployeeData){
    const index = this.employee.findIndex(em => em.id === employeeData.id);
    if(index !== -1){
      console.log(this.employee[index].id)
      console.log(index)
      this.employee[index] = employeeData;
      this.saveToLocal();
    }
  }

  resetEmployees() {
    localStorage.removeItem('employee');
    window.location.reload();
  }

  getEmployeeById(id: number): EmployeeData | undefined {
    return this.employee.find(e => e.id === id);
  }
}

function getRandomSalary(min: number = 3000000, max: number = 15000000): number {    
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
