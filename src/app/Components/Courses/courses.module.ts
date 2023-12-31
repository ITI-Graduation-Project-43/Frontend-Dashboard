import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { TruncatePipe } from './Pipes/truncate.pipe';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { CourseService } from 'src/app/services/Course.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CourseOverviewComponent } from './Components/course-overview/course-overview.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CoursesComponent, TruncatePipe, CourseOverviewComponent],
  providers: [CourseService],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatCardModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    SharedModule,
    MatPaginatorModule,
  ],
})
export class CoursesModule {}
