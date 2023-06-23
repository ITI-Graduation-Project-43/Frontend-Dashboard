import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { InstructorDataSource, Instructor } from './instructor-datasource';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Instructor>;

  dataSource: InstructorDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'Id',
    'FirstName',
    'LastName',
    'Title',
    'NoOfCourses',
    'NoOfStudents',
    'AvgRating',
    'NoOfRating',
    'CreatedAt',
    'UpdatedAt',
    'Visibility',
    'Edit',
    'Delete'
  ];

  constructor() {
    this.dataSource = new InstructorDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
