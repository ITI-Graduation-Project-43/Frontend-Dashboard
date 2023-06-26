import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Course } from 'src/app/Models/Course';
import { mapEnumValue } from 'src/app/shared/Helper/EnumMapper';
import { Language } from 'src/app/Models/Enums/CourseLanguage';
import { Level } from 'src/app/Models/Enums/CourseLevel';

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
    this.course.language = mapEnumValue(Language, this.course.language);
    this.course.level = mapEnumValue(Level, this.course.level);
    console.log(this.course);
  }
}
