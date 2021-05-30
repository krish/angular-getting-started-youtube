import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../shared/http.service';
import { Employee } from './Employees.model';

import { find, map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpService: HttpService) { }

  getEmployees(): Observable<Employee[]> {
    return this.httpService.getAllEmployees();
  }

  getEmployee(empId: String): Observable<Employee | undefined> {

    return this.httpService.getAllEmployees().pipe(
      map(data => data.find(e => e.id == empId))
    );

  }
}
