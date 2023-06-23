import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('../../Components/dashboard/dashboard.module')
      .then((m) => m.DashboardModule)
  },
  {
    path: 'student',
    loadChildren: () => import('../../Components/student/student.module')
      .then((m) => m.StudentModule)
  },
  {
    path: 'instructor',
    loadChildren: () => import('../../Components/instructor/instructor.module')
      .then((m) => m.InstructorModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }
