import { Component } from '@angular/core';
import { Course } from 'src/app/Models/Course';
import { CourseService } from 'src/app/Services/Course.service';
import { APIResponseVM } from 'src/app/shared/ViewModels/apiresponse-vm';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
})
export class CoursesComponent {
  courses: Course[] = [];
  constructor(private apiService: CourseService) {
    apiService
      .getAllItem('Course/nonApprovedCourses')
      .subscribe((data: APIResponseVM) => {
        this.courses = data.items;
        console.log(this.courses);
      });
  }

  Approve(id: number) {
    if (id == 0) return;
    else {
      let observer = {
        next: () => console.log('done'),
        error: () => console.log('error'),
      };
      this.apiService.makeCourseApprove(id).subscribe(observer);
    }
  }
}
