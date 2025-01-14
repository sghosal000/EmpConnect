import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:5000/emp'

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get(this.baseUrl)
  }

  deleteEmployee(empId: number) {
    return this.http.delete(`${this.baseUrl}/remove/${empId}`)
  }
}
