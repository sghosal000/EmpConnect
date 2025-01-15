import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { HeaderComponent } from '../../components/header/header.component';
import { EmployeeTableComponent } from '../../components/employee-table/employee-table.component';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, HeaderComponent, EmployeeTableComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  loading = true
  employees: any = []
  modalOpen = false
  newEmployee = {
    name: '',
    department: '',
    designation: '',
    salary: 0,
  }
  departments: string[] = ['HR', 'Finance', 'Engineering', 'Sales', 'Marketing'];
  error = ''

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchEmployees()
  }

  fetchEmployees(): void {
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

  openModal(): void {
    this.modalOpen = true
  }

  closeModal(): void {
    this.modalOpen = false
  }

  resetForm = () => {
    this.newEmployee = {
      name: '',
      department: '',
      designation: '',
      salary: 0,
    }
  }

  addEmployee() {
    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: () => {
        this.resetForm()
        this.fetchEmployees();
        this.closeModal();
      },
      error: (err) => {
        this.resetForm()
        alert("Could not add Employee details")
        console.error('Error adding employee:', err);
      },
    });
  }
}
