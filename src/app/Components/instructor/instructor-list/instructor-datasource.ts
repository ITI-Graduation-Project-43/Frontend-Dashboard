import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Observer } from 'rxjs';
import { Instructor } from '../../../Models/instructor';

// TODO: Replace this with your own data model type

// TODO: replace this with real data from your application

/**
 * Data source for the Instructor view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class InstructorDataSource extends DataSource<Instructor> {
  data!: Instructor[] | undefined;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: string = '';

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Instructor[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        observableOf(this.data),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...(this.data ?? [])]));
        })
      );
    } else {
      throw Error(
        'Please set the paginator and sort on the data source before connecting.'
      );
    }
  }

  private getPagedData(data: Instructor[]): Instructor[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      let filteredData = data.filter((item: Instructor) => {
        const searchStr =
          item.firstName + item.lastName + item.bio + item.title;
        return (
          searchStr.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1
        );
      });
      return filteredData.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
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
  // private getPagedData(data: Instructor[]): Instructor[] {
  //   if (this.paginator) {
  //     const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //     return data.splice(startIndex, this.paginator.pageSize);
  //   } else {
  //     return data;
  //   }
  // }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Instructor[]): Instructor[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'FirstName':
          return compare(a.firstName, b.firstName, isAsc);
        case 'Id':
          return compare(+a.id, +b.id, isAsc);
        case 'LastName':
          return compare(a.lastName, b.lastName, isAsc);
        case 'Bio':
          return compare(a.bio, b.bio, isAsc);
        case 'ProfilePicture':
          return compare(a.profilePicture || '', b.profilePicture || '', isAsc);
        case 'Title':
          return compare(a.title, b.title, isAsc);
        case 'Description':
          return compare(a.description, b.description, isAsc);
        case 'NoOfCourses':
          return compare(a.noOfCourses, b.noOfCourses, isAsc);
        case 'NoOfStudents':
          return compare(a.noOfStudents, b.noOfStudents, isAsc);
        case 'AvgRating':
          return compare(a.avgRating, b.avgRating, isAsc);
        case 'NoOfRating':
          return compare(a.noOfRating, b.noOfRating, isAsc);
        case 'CreatedAt':
          return compare(a.createdAt, b.createdAt, isAsc);
        case 'UpdatedAt':
          return compare(a.updatedAt, b.updatedAt, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number | Date,
  b: string | number | Date,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
