import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Student } from 'src/app/models/student';

// TODO: Replace this with your own data model type

// TODO: replace this with real data from your application
let EXAMPLE_DATA: Student[] = [
  {
    id: 1,
    firstName: 'Mohamed',
    lastName: 'Aly',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 2,
    firstName: 'Sayed',
    lastName: 'Hesham',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 25,
    numWishlists: 15,
    createdAt: new Date('2022-03-01'),
    updatedAt: new Date('2022-08-01'),
  },
  {
    id: 3,
    firstName: 'Mostafa',
    lastName: 'Elsayed',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 12,
    numWishlists: 18,
    createdAt: new Date('2022-05-01'),
    updatedAt: new Date('2022-06-01'),
  },
  {
    id: 4,
    firstName: 'essam',
    lastName: 'Mourtada',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 5,
    firstName: 'Ahmed',
    lastName: 'AlAlfy',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 6,
    firstName: 'Sawsan',
    lastName: 'Bedier',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 7,
    firstName: 'Nada',
    lastName: 'Mohamed',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 8,
    firstName: 'Alaa',
    lastName: 'Mandor',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 9,
    firstName: 'Mohamed',
    lastName: 'Ibraheem',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 10,
    firstName: 'Mahmoud',
    lastName: 'Menyawy',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 11,
    firstName: 'Abdelrahman',
    lastName: 'Ouf',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 12,
    firstName: 'Tarek',
    lastName: 'Eslam',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 13,
    firstName: 'Ramadan',
    lastName: 'Galal',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 14,
    firstName: 'Mohamed',
    lastName: 'Sameh',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 15,
    firstName: 'Raed',
    lastName: 'Mourad',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 16,
    firstName: 'Aya',
    lastName: 'Ahmed',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 17,
    firstName: 'Sara',
    lastName: 'Alaa',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 18,
    firstName: 'Mahmoud',
    lastName: 'Yasser',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 19,
    firstName: 'Basel',
    lastName: 'Atef',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 20,
    firstName: 'Mohamed',
    lastName: 'Roshdy',
    bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    profilePicture:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    numCourses: 50,
    numWishlists: 10,
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
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
  filter!: ElementRef;

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
        case 'NoOfCourses':
          return compare(+a.numCourses, +b.numCourses, isAsc);
        case 'NoOfWishlists':
          return compare(+a.numWishlists, +b.numWishlists, isAsc);
        case 'CreatedAt':
          return compare(+a.createdAt, +b.createdAt, isAsc);
        case 'UpdatedAt':
          return compare(+a.updatedAt, +b.updatedAt, isAsc);
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
