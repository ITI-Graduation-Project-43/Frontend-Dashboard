import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/Models/Course';
import { CourseService } from 'src/app/Services/Course.service';
import { APIResponseVM } from 'src/app/shared/ViewModels/apiresponse-vm';
import { CourseOverviewComponent } from './Components/course-overview/course-overview.component';
import { NotificationService } from 'src/app/shared/Services/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading: boolean = true;
  constructor(
    private apiService: CourseService,
    public dialog: MatDialog,
    private notification: NotificationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.fetchData();
  }

  Approve(id: number) {
    if (id == 0) return;
    else {
      let observer = {
        next: () => {
          console.log('Approve');
          this.notification.notify('Course has been approved', 'success');
        },
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
      width: '650px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        key: obj,
      },
    });
  }

  fetchData() {
    this.apiService
      .getAllItem('Course/nonApprovedCourses')
      .subscribe((data: APIResponseVM) => {
        this.courses = data.items;
      });
  }
}
