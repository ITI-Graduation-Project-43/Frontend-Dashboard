import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Course } from 'src/app/Models/Course';

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.scss'],
})
export class CourseOverviewComponent implements OnInit {
  headerInfo: string = 'Course Details';
  course!: Course;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
    // console.log(this.data.key);
    this.course = this.data.key;
    console.log(this.course);
  }
}
