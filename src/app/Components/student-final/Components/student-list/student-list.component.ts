import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { APIService } from 'src/app/shared/Services/api.service';
import { Student } from 'src/app/Models/student';
import { StudentUpdateComponent } from '../student-update/student-update.component';
import { StudentDeleteComponent } from '../student-delete/student-delete.component';
import { StudentAddComponent } from '../student-add/student-add.component';
import { StudentDetailComponent } from '../student-detail/student-detail.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  loading: boolean = true;
  Students: Student[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public dataSource!: MatTableDataSource<Student>;
  displayedColumns: string[] = [
    'FirstName',
    'LastName',
    'NoOfCourses',
    'NoOfWishlists',
    'Details',
    'Edit',
    'Delete',
  ];
  constructor(private apiService: APIService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this.fetchData();
  }

  //for filtering the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  fetchData(pageNumber: number = 1, pageSize: number = 5) {
    const observer = {
      next: (data: any) => {
        this.loading = false;
        this.Students = data.items;
        this.dataSource = new MatTableDataSource(this.Students);
        this.dataSource.sort = this.sort;
      },
      error: (error: any) => {
        console.log(error);
      },
    };
    this.apiService
      .getAllItem(`Student?PageNumber=${pageNumber}&PageSize=${pageSize}`)
      .subscribe(observer);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex + 1;
    const endIndex = event.pageSize;
    this.fetchData(startIndex, endIndex);
  }
  addNew() {
    const dialogRef = this.dialog.open(StudentAddComponent, {
      data: {},
    });
  }

  startEdit(student: Student) {
    const dialogRef = this.dialog.open(StudentUpdateComponent, {
      data: student,
    });
  }

  openDetailsDialog(student: Student): void {
    const dialogRef = this.dialog.open(StudentDetailComponent, {
      data: student,
    });
  }

  deleteItem(row: Student) {
    const dialogRef = this.dialog.open(StudentDeleteComponent, {
      data: row,
    });
  }
}
