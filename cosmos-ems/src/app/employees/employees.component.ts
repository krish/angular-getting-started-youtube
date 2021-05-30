import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from './employee.service';

import { Employee } from './Employees.model';

@Component({
  selector: 'em-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  title: string = 'Employee Management Solution......'
  employees!: Employee[];
  filteredEmployees!: Employee[];
  showIcon: boolean = false;
  message: string = '';
  substriber!: Subscription;
  private _designationFilter: string = ''

  set designationFilter(value: string) {

    this._designationFilter = value;
    this.filterByDesignation()

  }

  get designationFilter(): string {
    return this._designationFilter;
  }

  constructor(private employeeService: EmployeeService,private router: Router) { }

  ngOnInit(): void {

    this.substriber = this.employeeService.getEmployees().subscribe({
      next: data => {
        this.filteredEmployees = data;
        this.employees = this.filteredEmployees
      }
    })
  }

  ngOnDestroy() {
    this.substriber.unsubscribe();
  }
  toggleIcon() {
    this.showIcon = !this.showIcon;
  }
  filterByDesignation() {
    this.filteredEmployees = this.employees.filter(employee => employee.designation.includes(this.designationFilter))
  }

  onMessageRecived(value: string) {
    this.message = value;
  }

  onRouteChange(empId: string) {
    this.router.navigate(['empview', empId]);
  }
}
