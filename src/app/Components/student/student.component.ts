import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StudentDataSource } from './student-datasource';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, fromEvent, map, merge } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(ElementRef) filter!: ElementRef;
  @ViewChild(MatTable) table!: MatTable<Student>;
  dataSource: StudentDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    ' ',
    'id',
    'fullName',
    'Bio',
    'NoOfCourses',
    'NoOfWishlists',
    'CreatedAt',
    'UpdatedAt',
    'Visibility',
    'Edit',
    'Delete',
  ];

  constructor() {
    this.dataSource = new StudentDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}

/////////
/////////

// export class StudentComponent implements OnInit {
//   displayedColumns = [
//     ' ',
//     'id',
//     'fullName',
//     'Bio',
//     'NoOfCourses',
//     'NoOfWishlists',
//     'CreatedAt',
//     'UpdatedAt',
//     'Visibility',
//     'Edit',
//     'Delete',
//   ];
//   exampleDatabase!: StudentService;
//   dataSource!: ExampleDataSource | null;
//   index!: number;
//   id!: number;

//   constructor(
//     public httpClient: HttpClient,
//     // public dialog: MatDialog,
//     public dataService: StudentService
//   ) {}

//   @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
//   @ViewChild(MatSort, { static: true }) sort!: MatSort;
//   @ViewChild('filter', { static: true }) filter!: ElementRef;

//   // addNew() {
//   //   const dialogRef = this.dialog.open(AddDialogComponent, {
//   //     data: { issue: Student },
//   //   });

//   //   dialogRef.afterClosed().subscribe((result) => {
//   //     if (result === 1) {
//   //       // After dialog is closed we're doing frontend updates
//   //       // For add we're just pushing a new row inside DataService
//   //       this.exampleDatabase.dataChange.value.push(
//   //         this.dataService.getDialogData()
//   //       );
//   //       this.refreshTable();
//   //     }
//   //   });
//   // }

//   // startEdit(
//   //   i: number,
//   //   id: number,
//   //   title: string,
//   //   state: string,
//   //   url: string,
//   //   created_at: string,
//   //   updated_at: string
//   // ) {
//   //   this.id = id;
//   //   // index row is used just for debugging proposes and can be removed
//   //   this.index = i;
//   //   console.log(this.index);
//   //   const dialogRef = this.dialog.open(EditDialogComponent, {
//   //     data: {
//   //       id: id,
//   //       title: title,
//   //       state: state,
//   //       url: url,
//   //       created_at: created_at,
//   //       updated_at: updated_at,
//   //     },
//   //   });

//   //   dialogRef.afterClosed().subscribe((result) => {
//   //     if (result === 1) {
//   //       // When using an edit things are little different, firstly we find record inside DataService by id
//   //       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
//   //         (x) => x.id === this.id
//   //       );
//   //       // Then you update that record using data from dialogData (values you enetered)
//   //       this.exampleDatabase.dataChange.value[foundIndex] =
//   //         this.dataService.getDialogData();
//   //       // And lastly refresh table
//   //       this.refreshTable();
//   //     }
//   //   });
//   // }

//   // deleteItem(i: number, id: number, title: string, state: string, url: string) {
//   //   this.index = i;
//   //   this.id = id;
//   //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
//   //     data: { id: id, title: title, state: state, url: url },
//   //   });

//   //   dialogRef.afterClosed().subscribe((result) => {
//   //     if (result === 1) {
//   //       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
//   //         (x) => x.id === this.id
//   //       );
//   //       // for delete we use splice in order to remove single object from DataService
//   //       this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
//   //       this.refreshTable();
//   //     }
//   //   });
//   // }
//   ngOnInit() {
//     this.loadData();
//   }

//   public loadData() {
//     this.exampleDatabase = new StudentService(this.httpClient);
//     this.dataSource = new ExampleDataSource(
//       this.exampleDatabase,
//       this.paginator,
//       this.sort
//     );
//     fromEvent(this.filter.nativeElement, 'keyup')
//       // .debounceTime(150)
//       // .distinctUntilChanged()
//       .subscribe(() => {
//         if (!this.dataSource) {
//           return;
//         }
//         this.dataSource.filter = this.filter.nativeElement.value;
//       });
//   }

//   private refreshTable() {
//     this.paginator._changePageSize(this.paginator.pageSize);
//   }
// }

// export class ExampleDataSource extends DataSource<Student> {
//   _filterChange = new BehaviorSubject('');

//   get filter(): string {
//     return this._filterChange.value;
//   }

//   set filter(filter: string) {
//     this._filterChange.next(filter);
//   }

//   filteredData: Student[] = [];
//   renderedData: Student[] = [];

//   constructor(
//     public _exampleDatabase: StudentService,
//     public _paginator: MatPaginator,
//     public _sort: MatSort
//   ) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
//   }

//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<Student[]> {
//     // Listen for any changes in the base data, sorting, filtering, or pagination
//     const displayDataChanges = [
//       this._exampleDatabase.dataChange,
//       this._sort.sortChange,
//       this._filterChange,
//       this._paginator.page,
//     ];

//     this._exampleDatabase.getAllIssues();

//     return merge(...displayDataChanges).pipe(
//       map(() => {
//         // Filter data
//         this.filteredData = this._exampleDatabase.data
//           .slice()
//           .filter((student: Student) => {
//             const searchStr = (
//               student.firstName + student.lastName
//             ).toLowerCase();
//             return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//           });

//         // Sort filtered data
//         const sortedData = this.sortData(this.filteredData.slice());

//         // Grab the page's slice of the filtered sorted data.
//         const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//         this.renderedData = sortedData.splice(
//           startIndex,
//           this._paginator.pageSize
//         );
//         return this.renderedData;
//       })
//     );
//   }

//   disconnect() {}

//   /** Returns a sorted copy of the database data. */
//   sortData(data: Student[]): Student[] {
//     if (!this._sort.active || this._sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';

//       switch (this._sort.active) {
//         case 'id':
//           [propertyA, propertyB] = [a.id, b.id];
//           break;
//         case 'fullName':
//           [propertyA, propertyB] = [
//             a.firstName + ' ' + a.lastName,
//             b.firstName + ' ' + b.lastName,
//           ];
//           break;
//         case 'NoOfCourses':
//           [propertyA, propertyB] = [a.numCourses, b.numCourses];
//           break;
//         case 'NoOfWishlists':
//           [propertyA, propertyB] = [a.numWishlists, b.numWishlists];
//           break;
//         case 'CreatedAt':
//           [propertyA, propertyB] = [
//             a.createdAt.toISOString(),
//             b.createdAt.toISOString(),
//           ];
//           break;
//         case 'UpdatedAt':
//           [propertyA, propertyB] = [
//             a.updatedAt.toISOString(),
//             b.updatedAt.toISOString(),
//           ];
//           break;
//       }

//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

//       return (
//         (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
//       );
//     });
//   }
// }
// function compare(arg0: string, arg1: string, isAsc: boolean): number {
//   throw new Error('Function not implemented.');
// }
