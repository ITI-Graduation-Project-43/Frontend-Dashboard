import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface Student {
  id: number;
  firstName: string;
  lastName: string;
}

// TODO: replace this with real data from your application
let EXAMPLE_DATA: Student[] = [
  { id: 1, firstName: 'Mohamed', lastName: 'Aly' },
  { id: 2, firstName: 'Sayed', lastName: 'Hesham' },
  { id: 3, firstName: 'Mostafa', lastName: 'Elsayed' },
  { id: 4, firstName: 'essam', lastName: 'Mourtada' },
  { id: 5, firstName: 'Ahmed', lastName: 'AlAlfy' },
  { id: 6, firstName: 'Sawsan', lastName: 'Bedier' },
  { id: 7, firstName: 'Nada', lastName: 'Mohamed' },
  { id: 8, firstName: 'Alaa', lastName: 'Mandor' },
  { id: 9, firstName: 'Mohamed', lastName: 'Ibraheem' },
  { id: 10, firstName: 'Mahmoud', lastName: 'Menyawy' },
  { id: 11, firstName: 'Abdelrahman', lastName: 'Ouf' },
  { id: 12, firstName: 'Tarek', lastName: 'Eslam' },
  { id: 13, firstName: 'Ramadan', lastName: 'Galal' },
  { id: 14, firstName: 'Mohamed', lastName: 'Sameh' },
  { id: 15, firstName: 'Raed', lastName: 'Mourad' },
  { id: 16, firstName: 'Aya', lastName: 'Ahmed' },
  { id: 17, firstName: 'Sara', lastName: 'Alaa' },
  { id: 18, firstName: 'Mahmoud', lastName: 'Yasser' },
  { id: 19, firstName: 'Basel', lastName: 'Atef' },
  { id: 20, firstName: 'Mohamed', lastName: 'Roshdy' },
];

/**
 * Data source for the Student view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StudentDataSource extends DataSource<Student> {
  data: Student[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Student[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Student[]): Student[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Student[]): Student[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'fullName':
          return compare(
            a.firstName + ' ' + a.lastName,
            b.firstName + ' ' + b.lastName,
            isAsc
          );
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
