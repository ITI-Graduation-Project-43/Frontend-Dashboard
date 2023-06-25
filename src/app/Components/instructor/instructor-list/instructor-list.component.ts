import { AfterViewInit, Component, ViewChild, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InstructorDataSource } from './instructor-datasource';
import { InstructorDetailsComponent } from '../instructor-details/instructor-details.component';
import { Instructor } from 'src/app/Models/instructor';
import { InstructorDeleteComponent } from '../instructor-delete/instructor-delete.component';
import { InstructorService } from 'src/app/Services/instructor.service';
import { Observer, connect } from 'rxjs';
import { InstructorAddComponent } from '../instructor-add/instructor-add.component';
import { InstructorUpdateComponent } from '../instructor-update/instructor-update.component';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Instructor>;
  resetFilter:Instructor[] = [];

  observer: Observer<Instructor[]> = {
    next: (insData: Instructor[]) => {
      this.instructorService.dataSource.data = insData;
      this.instructorService.dataSource.sort = this.sort;
      this.instructorService.dataSource.paginator = this.paginator;
      this.table.dataSource = this.instructorService.dataSource;
      this.resetFilter = insData;
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      console.log("done")
    }
  }


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'FirstName',
    'LastName',
    'Title',
    'NoOfCourses',
    'NoOfStudents',
    'AvgRating',
    'NoOfRating',
    'Visibility',
    'Edit',
    'Delete'
  ];

  constructor(private dialog: MatDialog,
    public instructorService: InstructorService) {
    instructorService.dataSource = new InstructorDataSource();
  }


  ngOnInit(): void {
    this.instructorService.getAllInstructors().subscribe(this.observer);
    this.renderRows();
  }

  renderRows() {
    this.instructorService.getData().subscribe((data => {
      console.log(data)
      if (data) {
        this.instructorService.dataSource.data = data;
        this.table.dataSource = data;
      }
    }));
  }

  applyFilter(event: any) {
    this.instructorService.dataSource.data = this.table.dataSource = this.resetFilter;
    this.instructorService.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.instructorService.dataSource.connect().subscribe((data)=>{
      this.instructorService.dataSource.data = data;
      this.table.dataSource = data;  
    })
  }

  openDetailsDialog(instructor: Instructor): void {
    const dialogRef = this.dialog.open(InstructorDetailsComponent);
    dialogRef.componentInstance.instructor = instructor;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDeleteDialog(instructorFirstName: string, instructorLastName: string, instructorId: string): void {
    const dialogRef = this.dialog.open(InstructorDeleteComponent);
    dialogRef.componentInstance.instructorFirstName = instructorFirstName;
    dialogRef.componentInstance.instructorLastName = instructorLastName;
    dialogRef.componentInstance.instructorId = instructorId;
  }

  openAddDialog(): void {
    this.dialog.open(InstructorAddComponent);
  }

  openUpdateDialog(instructor:Instructor){
    const dialogRef = this.dialog.open(InstructorUpdateComponent);
    dialogRef.componentInstance.instructor = instructor;
  }
}
