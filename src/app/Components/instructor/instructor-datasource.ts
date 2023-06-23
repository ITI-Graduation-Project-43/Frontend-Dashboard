import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface Instructor {
  Id: string;
  FirstName: string;
  LastName: string;
  Bio: string;
  ProfilePicture?: string;
  Title: string;
  Description: string;
  NoOfCourses: number;
  NoOfStudents: number;
  AvgRating: number;
  NoOfRating: number;
  CreatedAt: Date;
  UpdatedAt: Date;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Instructor[] = [
  {
    Id: '1',
    FirstName: 'John',
    LastName: 'Doe',
    Bio: 'John Doe is a computer science professor with over 10 years of teaching experience.',
    ProfilePicture: 'https://example.com/profiles/johndoe.jpg',
    Title: 'Professor',
    Description: 'John teaches courses on computer programming and software engineering.',
    NoOfCourses: 50,
    NoOfStudents: 100,
    AvgRating: 4.5,
    NoOfRating: 20,
    CreatedAt: new Date('2022-01-01'),
    UpdatedAt: new Date('2022-01-01'),
  },
  {
    Id: '2',
    FirstName: 'Jane',
    LastName: 'Smith',
    Bio: 'Jane Smith is a math professor with a passion for teaching.',
    ProfilePicture: 'https://example.com/profiles/janesmith.jpg',
    Title: 'Professor',
    Description: 'Jane teaches courses on calculus and statistics.',
    NoOfCourses: 30,
    NoOfStudents: 50,
    AvgRating: 4.0,
    NoOfRating: 10,
    CreatedAt: new Date('2022-01-02'),
    UpdatedAt: new Date('2022-01-02'),
  },
  {
    Id: '3',
    FirstName: 'Mark',
    LastName: 'Johnson',
    Bio: 'Mark Johnson is a physics professor with a passion for research.',
    ProfilePicture: 'https://example.com/profiles/markjohnson.jpg',
    Title: 'Professor',
    Description: 'Mark teaches courses on classical mechanics and quantum mechanics.',
    NoOfCourses: 20,
    NoOfStudents: 30,
    AvgRating: 4.2,
    NoOfRating: 8,
    CreatedAt: new Date('2022-01-03'),
    UpdatedAt: new Date('2022-01-03'),
  },
  {
    Id: '4',
    FirstName: 'Sarah',
    LastName: 'Lee',
    Bio: 'Sarah Lee is a biology professor with a passion for ecology.',
    ProfilePicture: 'https://example.com/profiles/sarahlee.jpg',
    Title: 'Professor',
    Description: 'Sarah teaches courses on ecology and environmental science.',
    NoOfCourses: 40,
    NoOfStudents: 60,
    AvgRating: 4.3,
    NoOfRating: 12,
    CreatedAt: new Date('2022-01-04'),
    UpdatedAt: new Date('2022-01-04'),
  },
  {
    Id: '5',
    FirstName: 'David',
    LastName: 'Brown',
    Bio: 'David Brown is a chemistry professor with a passion for organic chemistry.',
    ProfilePicture: 'https://example.com/profiles/davidbrown.jpg',
    Title: 'Professor',
    Description: 'David teaches courses on organic chemistry and biochemistry.',
    NoOfCourses: 30,
    NoOfStudents: 50,
    AvgRating: 4.6,
    NoOfRating: 15,
    CreatedAt: new Date('2022-01-05'),
    UpdatedAt: new Date('2022-01-05'),
  },
  {
    Id: '6',
    FirstName: 'Emily',
    LastName: 'Davis',
    Bio: 'Emily Davis is a history professor with a passion for ancient civilizations.',
    ProfilePicture: 'https://example.com/profiles/emilydavis.jpg',
    Title: 'Professor',
    Description: 'Emily teaches courses on ancient history and world civilizations.',
    NoOfCourses: 20,
    NoOfStudents: 40,
    AvgRating: 4.1,
    NoOfRating: 10,
    CreatedAt: new Date('2022-01-06'),
    UpdatedAt: new Date('2022-01-06'),
  },
  {
    Id: '7',
    FirstName: 'Michael',
    LastName: 'Wilson',
    Bio: 'Michael Wilson is a psychology professor with a passion for cognitive neuroscience.',
    ProfilePicture: 'https://example.com/profiles/michaelwilson.jpg',
    Title: 'Professor',
    Description: 'Michael teaches courses on cognitive psychology and neuroscience.',
    NoOfCourses: 30,
    NoOfStudents: 70,
    AvgRating: 4.4,
    NoOfRating: 18,
    CreatedAt: new Date('2022-01-07'),
    UpdatedAt: new Date('2022-01-07'),
  },
  {
    Id: '8',
    FirstName: 'Karen',
    LastName: 'Taylor',
    Bio: 'Karen Taylor is an English professor with a passion for literature.',
    ProfilePicture: 'https://example.com/profiles/karentaylor.jpg',
    Title: 'Professor',
    Description: 'Karen teaches courses on Shakespeare and modern literature.',
    NoOfCourses: 20,
    NoOfStudents: 30,
    AvgRating: 4.0,
    NoOfRating: 10,
    CreatedAt: new Date('2022-01-08'),
    UpdatedAt: new Date('2022-01-08'),
  },
  {
    Id: '9',
    FirstName: 'William',
    LastName: 'Clark',
    Bio: 'William Clark is a geography professor with a passion for cartography.',
    ProfilePicture: 'https://example.com/profiles/williamclark.jpg',
    Title: 'Professor',
    Description: 'William teaches courses on cartography and geographic information systems.',
    NoOfCourses: 30,
    NoOfStudents: 50,
    AvgRating: 4.2,
    NoOfRating: 12,
    CreatedAt: new Date('2022-01-09'),
    UpdatedAt: new Date('2022-01-09'),
  },
  {
    Id: '10',
    FirstName: 'Elizabeth',
    LastName: 'Garcia',
    Bio: 'Elizabeth Garcia is a Spanish professor with a passion for Latin American literature.',
    ProfilePicture: 'https://example.com/profiles/elizabethgarcia.jpg',
    Title: 'Professor',
    Description: 'Elizabeth teaches courses on Spanish language and Latin American literature.',
    NoOfCourses: 40,
    NoOfStudents: 80,
    AvgRating: 4.5,
    NoOfRating: 20,
    CreatedAt: new Date('2022-01-10'),
    UpdatedAt: new Date('2022-01-10'),
  }
];

/**
 * Data source for the Instructor view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class InstructorDataSource extends DataSource<Instructor> {
  data: Instructor[] = EXAMPLE_DATA;
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
  connect(): Observable<Instructor[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Instructor[]): Instructor[] {
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
  private getSortedData(data: Instructor[]): Instructor[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'FirstName': return compare(a.FirstName, b.FirstName, isAsc);
        case 'Id': return compare(+a.Id, +b.Id, isAsc);
        case 'LastName': return compare(a.LastName, b.LastName, isAsc);
        case 'Bio': return compare(a.Bio, b.Bio, isAsc);
        case 'ProfilePicture': return compare(a.ProfilePicture || '', b.ProfilePicture || '', isAsc);
        case 'Title': return compare(a.Title, b.Title, isAsc);
        case 'Description': return compare(a.Description, b.Description, isAsc);
        case 'NoOfCourses': return compare(a.NoOfCourses, b.NoOfCourses, isAsc);
        case 'NoOfStudents': return compare(a.NoOfStudents, b.NoOfStudents, isAsc);
        case 'AvgRating': return compare(a.AvgRating, b.AvgRating, isAsc);
        case 'NoOfRating': return compare(a.NoOfRating, b.NoOfRating, isAsc);
        case 'CreatedAt': return compare(a.CreatedAt, b.CreatedAt, isAsc);
        case 'UpdatedAt': return compare(a.UpdatedAt, b.UpdatedAt, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
