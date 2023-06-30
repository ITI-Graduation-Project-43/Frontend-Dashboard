import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentUpdateComponent } from './components/student-update/student-update.component';
import { StudentDeleteComponent } from './components/student-delete/student-delete.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/Models/student';
import { StudentDetailsComponent } from './components/student-details/student-details.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  displayedColumns = [
    'id',
    'FirstName',
    'LastName',
    'NoOfCourses',
    'NoOfWishlists',
    'Visibility',
    'Edit',
    'Delete',
  ];
  exampleDatabase!: StudentService;
  dataSource!: StudentDataSource;
  index!: number;
  id!: string;
  loading: boolean = true;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public studentService: StudentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  ngOnInit() {
    this.loadData();
    this.fetchData();
  }

  addNew() {
    const dialogRef = this.dialog.open(StudentAddComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.exampleDatabase.data.push(this.studentService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(student: Student) {
    this.id = student.id;
    const dialogRef = this.dialog.open(StudentUpdateComponent, {
      data: student,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.studentService.getDialogData();
        this.refreshTable();
      }
    });
  }

  openDetailsDialog(student: Student): void {
    const dialogRef = this.dialog.open(StudentDetailsComponent, {
      data: student,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  deleteItem(row: Student) {
    const dialogRef = this.dialog.open(StudentDeleteComponent, {
      data: row,
    });
  }

  private refreshTable() {
    this.loadData();
    this.paginator._changePageSize(this.paginator.pageSize);
    this.changeDetectorRef.detectChanges();
  }

  public loadData() {
    this.exampleDatabase = this.studentService;
    this.dataSource = new StudentDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );

    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
  fetchData(pageNumber: number = 1, pageSize: number = 5) {
    this.studentService
      .getAllStudents(pageNumber, pageSize)
      .subscribe((data) => {
        this.exampleDatabase.setData(data);
        this.loading = false;
      });
  }
  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex + 1;
    const endIndex = event.pageSize;
    this.fetchData(startIndex, endIndex);
  }
}

export class StudentDataSource extends DataSource<Student> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Student[] = [];
  renderedData: Student[] = [];

  constructor(
    public _exampleDatabase: StudentService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Student[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    // this._exampleDatabase.getAllStudents(1, 5);

    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((student: Student) => {
            const searchStr = (
              student.id +
              student.firstName +
              student.lastName
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this._paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Student[]): Student[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'FirstName':
          [propertyA, propertyB] = [a.firstName, b.firstName];
          break;
        case 'LastName':
          [propertyA, propertyB] = [a.lastName, b.lastName];
          break;
        case 'Bio':
          [propertyA, propertyB] = [a.bio, b.bio];
          break;
        case 'CreatedAt':
          [propertyA, propertyB] = [
            a.createdAt.toISOString(),
            b.createdAt.toISOString(),
          ];
          break;
        case 'UpdatedAt':
          [propertyA, propertyB] = [
            a.updatedAt.toISOString(),
            b.updatedAt.toISOString(),
          ];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
