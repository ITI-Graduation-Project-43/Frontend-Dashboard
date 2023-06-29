import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'bi', pathMatch: 'full' },
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
  {
    path: 'messages',
    loadChildren: () =>
      import('../../Components/Messages/messages.module').then(
        (m) => m.MessagesModule
      ),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('../../Components/category/category.module').then(
        (m) => m.CategoryModule
        ),
  },
  {
    path: 'coupon',
    loadChildren: () =>
      import('../../Components/coupon/coupon.module').then(
        (m) => m.CouponModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavRoutingModule {}
