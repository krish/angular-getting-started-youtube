import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from '../employees/employee.service';
import { Employee } from '../employees/Employees.model';

@Component({
  selector: 'em-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.scss']
})
export class EmployeeViewComponent implements OnInit {

  employee!: Employee;

  checkboxFlag!:boolean;

  constructor(private route: ActivatedRoute, private _location: Location, private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.employeeService.getEmployee(this.route.snapshot.params['id']).subscribe(emp => this.employee = emp!);
  }

  backClicked() {
    this._location.back();
  }

}
