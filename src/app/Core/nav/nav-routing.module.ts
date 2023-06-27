import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'bi', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../../Components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('../../Components/student/student.module').then(
        (m) => m.StudentModule
      ),
  },
  {
    path: 'instructor',
    loadChildren: () =>
      import('../../Components/instructor/instructor.module').then(
        (m) => m.InstructorModule
      ),
  },
  {
    path: 'bi',
    loadChildren: () =>
      import('../../Components/power-bi-report/power-bi-report.module').then(
        (m) => m.PowerBiReportModule
      ),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('../../Components/Courses/courses.module').then(
        (m) => m.CoursesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavRoutingModule {}
