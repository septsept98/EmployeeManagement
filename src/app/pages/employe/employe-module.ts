import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeRoutingModule } from './employe-routing-module';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeeAdd } from './employee-add/employee-add';
import { EmployeeUpdate } from './employee-update/employee-update';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetail } from './employee-detail/employee-detail';



@NgModule({
  declarations: [
    EmployeeList,
    EmployeeAdd,
    EmployeeUpdate,
    EmployeeDetail
  ],
  imports: [
    CommonModule,
    EmployeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeModule { }
