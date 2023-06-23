import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InstructorDataSource } from './instructor-datasource';
import { InstructorDetailsComponent } from '../instructor-details/instructor-details.component';
import { Instructor } from 'src/app/Models/instructor';
import { InstructorDeleteComponent } from '../instructor-delete/instructor-delete.component';
import { InstructorService } from 'src/app/Services/instructor.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements AfterViewInit {
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

  constructor(private dialog: MatDialog, public service:InstructorService) {
    this.dataSource = new InstructorDataSource(service);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openDetailsDialog(instructor: Instructor): void {
    const dialogRef = this.dialog.open(InstructorDetailsComponent);
    dialogRef.componentInstance.instructor = instructor;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDeleteDialog(instructorName: string, instructorId: string): void {
    const dialogRef = this.dialog.open(InstructorDeleteComponent);
    dialogRef.componentInstance.instructorName = instructorName;
    dialogRef.componentInstance.instructorId = instructorId;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
