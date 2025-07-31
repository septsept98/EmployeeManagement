import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeData } from '../../../model/employee.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {
  employee: EmployeeData[] = [];
  filteredEmployee: EmployeeData[] = [];
  paginatedEmployee: EmployeeData[] = [];
  pendingDelete: EmployeeData | null = null;
  pendingEdit: EmployeeData | null = null;
  confirmDelete = false;
  confirmEditing = false;
  editModel: Partial<EmployeeData> = {};
  groups: String[] = [];

  page = 1;
  pageSize = 10;
  searchItem = '';
  sortColumn: keyof EmployeeData = 'username';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchItem = params['search'] || '';
    });
    this.groups = this.employeeService.getGroup();
    this.applyFilteredSortPagination();
  }

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  loadEmployees() {
    this.employee = this.employeeService.getEmployee();
  }

  applyFilteredSortPagination() {
    this.loadEmployees();
    this.filteredEmployee = this.employee.filter(emp => 
      Object.values(emp).some(val =>
        val.toString().toLowerCase().includes(this.searchItem.toLowerCase())
      )
    );

    this.filteredEmployee.sort((a, b) => {
      const valA = a[this.sortColumn];
      const valB = b[this.sortColumn];
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmployee = this.filteredEmployee.slice(start, end);
  }

  onSearchChange() {
    this.page = 1;
    this.applyFilteredSortPagination();
  }

  changeSort(column: keyof EmployeeData) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilteredSortPagination();
  }
  
  changePage(newPage: number) {
    this.page = newPage;
    this.applyFilteredSortPagination();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEmployee.length / this.pageSize);
  }

  askDelete(emp: EmployeeData){
    this.pendingDelete = emp;
    this.confirmDelete = true;
  }

  cancelConfirm(){
    this.pendingDelete = null;
    this.confirmDelete = false;
  }

  doDelete(){
    if (!this.pendingDelete) return;
    this.employeeService.deleteEmployee(this.pendingDelete.id);
    this.cancelConfirm();
    this.applyFilteredSortPagination();
  }

  askEdit(emp: EmployeeData){
    this.pendingEdit = emp;
    this.editModel = {
      username: emp.username,
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      birthDate: emp.birthDate,
      basicSalary: emp.basicSalary,
      group: emp.group,
      status: emp.status,
      description: emp.description
    };
    this.confirmEditing = true;
  }

  cancelEdit(){
    this.pendingEdit = null;
    this.confirmEditing = false;
    this.editModel = {};
  }

  doEdit(){
    if(!this.pendingEdit) return;

    const updated: EmployeeData = {
      ...this.pendingEdit,
      username: this.editModel.username ?? this.pendingEdit.username,
      firstName: this.editModel.firstName ?? this.pendingEdit.firstName,
      lastName: this.editModel.lastName ?? this.pendingEdit.lastName,
      email: this.editModel.email ?? this.pendingEdit.email,
      birthDate: this.editModel.birthDate ?? this.pendingEdit.birthDate,
      basicSalary: this.editModel.basicSalary ?? this.pendingEdit.basicSalary,
      group: this.editModel.group ?? this.pendingEdit.group,
      status: this.editModel.status ?? this.pendingEdit.status,
      description: this.editModel.description ?? this.pendingEdit.description
    }
    this.employeeService.updateEmployee(updated);
    this.cancelEdit();
    this.applyFilteredSortPagination();
  }

}



