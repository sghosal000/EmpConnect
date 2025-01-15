import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent {
  @Input() employees: any = []
  @Input() loading = true
  @Input() error = ''

  currentSorting = ''
  ascending = true

  constructor(private router: Router, private employeeService: EmployeeService) { }

  editEmployee(empId: number) {
    this.router.navigate([`/edit/${empId}`])
  }

  deleteEmployee(empId: number) {
    if (confirm("Delete this particular Employee details?")) {
      this.employeeService.deleteEmployee(empId).subscribe({
        next: () => {
          alert("Employee Deleted successfully")
          this.employeeService.getEmployees().subscribe({
            next: (data) => {
              this.employees = data
            },
            error: (err) => {
              this.error = "Error fetching Employee data"
              console.error(err)
            }
          })
        },
        error: (err) => {
          alert("Failed to delete Employee data")
          console.error(err)
        }
      })
    }
  }

  sortEmployees(field: string) {
    if (this.currentSorting === field) {
      this.ascending = !this.ascending
    } else {
      this.currentSorting = field
      this.ascending = true
    }

    this.employees.sort((a: any, b: any) => {
      if (a[field] < b[field]) return this.ascending ? -1 : 1;
      if (a[field] > b[field]) return this.ascending ? 1 : -1;
      return 0
    })
  }
}
