import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Category } from 'src/app/Models/category';

// TODO: Replace this with your own data model type


// TODO: replace this with real data from your application


/**
 * Data source for the Category view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CategoryDataSource extends DataSource<Category> {
  data!: Category[] | undefined;
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
  connect(): Observable<Category[]> {
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

  private getPagedData(data: Category[]): Category[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      let filteredData = data.filter((item: Category) => {
        const searchStr =
          item.name + item.type + item.parentCategoryName + item.parentSubCategoryName;
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
  disconnect(): void { }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Category[]): Category[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'parentCategoryName':
          return compare(a.parentCategoryName, b.parentCategoryName, isAsc);
        case 'parentSubCategoryName':
          return compare(a.parentSubCategoryName, b.parentSubCategoryName, isAsc);
        case 'Title':
          return compare(a.type, b.type, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
