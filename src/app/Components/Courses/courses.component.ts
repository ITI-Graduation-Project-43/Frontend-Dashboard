import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/Models/Course';
import { APIResponseVM } from 'src/app/shared/ViewModels/apiresponse-vm';
import { CourseOverviewComponent } from './Components/course-overview/course-overview.component';
import { NotificationService } from 'src/app/shared/Services/notification.service';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/Course.service';
import { PageEvent } from '@angular/material/paginator';
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
        next: (data: any) => {
          this.notification.notify('Course has been approved', 'success');
          this.fetchData();
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

  fetchData(pageNumber: number = 1, pageSize: number = 5) {
    this.apiService
      .getAllItem(
        `Course/nonApprovedCourses?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .subscribe((data: APIResponseVM) => {
        this.courses = data.items;
        this.loading = false;
      });
  }

  onPageChange(event: PageEvent) {
    this.loading = true;
    const startIndex = event.pageIndex+1;
    const endIndex = event.pageSize;
    this.fetchData(startIndex, endIndex);
  }
}
