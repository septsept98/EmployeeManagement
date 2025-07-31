import { Component, OnInit } from '@angular/core';
import { EmployeeData } from '../../../model/employee.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  standalone: false,
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css'
})
export class EmployeeDetail implements OnInit{
  employee: EmployeeData | undefined;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.employee = this.employeeService.getEmployeeById(id);
  }

  formatRupiah(value: number): String{
    return new Intl.NumberFormat('id-ID',{
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2
    }).format(value);
  }

  goBack(){
    this.router.navigate(['/management/employee'], {queryParamsHandling: 'preserve'})
  }

}
