import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/Models/Course';
import { CourseService } from '../../services/Course.service';
import { APIResponseVM } from 'src/app/shared/ViewModels/apiresponse-vm';
import { CourseOverviewComponent } from './Components/course-overview/course-overview.component';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses: Course[] = [];
  constructor(private apiService: CourseService, public dialog: MatDialog) {
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
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    obj: any
  ): void {
    this.dialog.open(CourseOverviewComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        key: obj,
      },
    });
  }
}
