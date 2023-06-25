import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';

import { MatCardModule } from '@angular/material/card';
import { CourseService } from 'src/app/Services/Course.service';
@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [CourseService],
})
export class CoursesModule {}
