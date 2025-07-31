import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeData } from '../../../model/employee.model';


@Component({
  selector: 'app-employee-add',
  standalone: false,
  templateUrl: './employee-add.html',
  styleUrl: './employee-add.css'
})
export class EmployeeAdd implements OnInit{
  groups: string[] = [];
  employeeForm: FormGroup;
  today: string = new Date().toISOString().split('T')[0]; 

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      group: ['Marketing', [Validators.required]],
      description: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      status: ['Aktif', Validators.required],
      basicSalary: ['', [Validators.required, Validators.min(0)]]
    });
  }
  ngOnInit(): void {
    this.groups = this.employeeService.getGroup();
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const customer: EmployeeData = this.employeeForm.value;
      console.log('Customer added:', customer);
      this.employeeService.addEmployee(customer);
      this.employeeForm.reset({
        id: -1,
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        birthDate: new Date(),
        basicSalary: 0,
        status: '',
        group: '',
        description: new Date()
      });
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

}
