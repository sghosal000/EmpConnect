import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css'
})
export class EmployeeTableComponent implements OnInit, OnChanges {
  @Input() employees: any = []
  @Input() loading = true
  @Input() error = ''

  @Output() addEmployee = new EventEmitter<void>()

  currentSorting = ''
  ascending = true
  searchStr = ''
  filteredEmployees: any = []
  
  pageEmployees: any = []
  itemsPerPage = 5
  currentPage = 0
  totalPages = 1


  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.filteredEmployees = [...this.employees]
    this.updatePagination()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchEmployees();
    this.filteredEmployees = [...this.employees];
    this.updatePagination()
  }

  openAddEmployeeModal() {
    this.addEmployee.emit()
  }

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
              this.filteredEmployees = data
              this.updatePagination()
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

    this.filteredEmployees.sort((a: any, b: any) => {
      const x = a[field] ?? ''
      const y = b[field] ?? ''

      if (!x && y) this.ascending ? -1 : 1;
      if (x && !y) this.ascending ? 1 : -1;

      // if (typeof x === 'string' && typeof y === 'string'){}

      if (x < y) return this.ascending ? -1 : 1;
      if (x > y) return this.ascending ? 1 : -1;
      return 0
    })

    this.updatePagination()
  }

  searchEmployees() {
    const searchStrLower = this.searchStr.toLocaleLowerCase()
    this.filteredEmployees = this.employees.filter((employee: any) =>
      employee.empId?.toString().toLocaleLowerCase().includes(searchStrLower) ||
      employee.name?.toLocaleLowerCase().includes(searchStrLower)
    )

    this.updatePagination()
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage)
    this.pageEmployees = this.filteredEmployees.slice(
      this.currentPage * this.itemsPerPage,
      (this.currentPage + 1) * this.itemsPerPage
    )
  }

  changePage(page: number) {
    this.currentPage = page
    this.updatePagination()
  }
}
