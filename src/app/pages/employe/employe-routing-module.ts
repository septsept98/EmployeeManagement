import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeList } from './employee-list/employee-list';
import { EmployeeAdd } from './employee-add/employee-add';
import { EmployeeUpdate } from './employee-update/employee-update';
import { EmployeeDetail } from './employee-detail/employee-detail';

const routes: Routes = [
  {
    path : "employee",
    component : EmployeeList
  },
  {
    path : "employee/add",
    component : EmployeeAdd
  }, 
  {
    path : "employee/update",
    component : EmployeeUpdate
  },
  {
    path: "employee/:id",
    component: EmployeeDetail
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EmployeRoutingModule { }
