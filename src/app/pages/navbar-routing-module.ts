import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { EmployeModule } from './employe/employe-module';

const routes: Routes=[
  {
    path : '',
    redirectTo : '/management/employee',
    pathMatch : 'full'
  },
  {
    path : '',
    component : Navbar,
    loadChildren : () => import('./employe/employe-module').then(m=>m.EmployeModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class NavbarRoutingModule { }
