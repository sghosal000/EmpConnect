import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, HeaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  employee: any = {}
  empId: number = 0
  loading = true

  constructor(
    private rout: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.empId = Number(this.rout.snapshot.paramMap.get('empId'))
    this.employeeService.getEmployeeById(this.empId).subscribe({
      next: (data) => {
        this.employee = data
        this.loading = false
      },
      error: () => {
        alert('Error fetching employee data');
        this.router.navigate(['/']);
      },
    })
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.empId, this.employee).subscribe({
      next: () => {
        alert("Employee data updated successfully")
        this.router.navigate(['/'])
      },
      error: () => {
        alert("Couldn't update Employee data")
      }
    })
  }
}
