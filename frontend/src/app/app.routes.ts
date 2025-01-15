import { Routes } from '@angular/router';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EditComponent } from './pages/edit/edit.component';

export const routes: Routes = [
    {path: '', component: EmployeeComponent},
    {path: 'edit/:empId', component: EditComponent}
];
