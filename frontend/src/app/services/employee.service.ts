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

  getEmployeeById(empId: number) {
    return this.http.get(`${this.baseUrl}/id/${empId}`)
  }

  addEmployee(employee: any) {
    return this.http.post(`${this.baseUrl}/add`, employee)
  }

  updateEmployee(empId: number, employeeData: any) {
    return this.http.put(`${this.baseUrl}/update/${empId}`, employeeData)
  }

  deleteEmployee(empId: number) {
    return this.http.delete(`${this.baseUrl}/remove/${empId}`)
  }
}
