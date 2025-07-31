import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarRoutingModule } from './navbar-routing-module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Navbar } from './navbar/navbar';


@NgModule({
  declarations: [
    Navbar
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    FormsModule,
    RouterModule
  ]
})
export class NavbarModule { }
