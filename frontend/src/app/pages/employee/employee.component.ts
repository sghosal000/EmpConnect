import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { HeaderComponent } from '../../components/header/header.component';
import { EmployeeTableComponent } from '../../components/employee-table/employee-table.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [HeaderComponent, EmployeeTableComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  employees: any = []
  loading = true
  error = ''

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data
        this.loading = false
      },
      error: (err) => {
        this.error = "Error fetching Employee data"
        this.loading = false
        console.error(err)
      }
    })
  }
}
