import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coupon } from 'src/app/Models/coupon';
import { CouponService } from 'src/app/services/coupon.service';
import { CouponAddComponent } from './components/coupon-add/coupon-add.component';
import { CouponUpdateComponent } from './components/coupon-update/coupon-update.component';
import { CouponDeleteComponent } from './components/coupon-delete/coupon-delete.component';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss'],
})
export class CouponComponent implements OnInit {
  loading: boolean = true;
  displayedColumns = [
    'id',
    'Code',
    'Discount',
    'CreatedAt',
    'ExpiresAt',
    'Edit',
    'Delete',
  ];
  exampleDatabase!: CouponService;
  dataSource!: CouponDataSource;
  id!: number;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public couponService: CouponService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  ngOnInit() {
    this.loadData();
    this.couponService.getAllCoupons().subscribe((data) => {
      this.exampleDatabase.setData(data);
      this.loading = false;
    });
  }

  addNew() {
    const dialogRef = this.dialog.open(CouponAddComponent, {
      data: {},
    });
  }
  startEdit(coupon: Coupon) {
    this.id = coupon.id;
    const dialogRef = this.dialog.open(CouponUpdateComponent, {
      data: coupon,
    });
  }
  deleteItem(row: Coupon) {
    const dialogRef = this.dialog.open(CouponDeleteComponent, {
      data: row,
    });
  }
  private refreshTable() {
    this.loadData();
    this.paginator._changePageSize(this.paginator.pageSize);
    this.changeDetectorRef.detectChanges();
  }

  public loadData() {
    this.exampleDatabase = this.couponService;
    this.dataSource = new CouponDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );

    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }
}

export class CouponDataSource extends DataSource<Coupon> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Coupon[] = [];
  renderedData: Coupon[] = [];

  constructor(
    public _exampleDatabase: CouponService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  connect(): Observable<Coupon[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    this._exampleDatabase.getAllCoupons();

    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((coupon: Coupon) => {
            const searchStr = coupon.code.toLowerCase();
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
  sortData(data: Coupon[]): Coupon[] {
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
        case 'Code':
          [propertyA, propertyB] = [a.code, b.code];
          break;
        case 'CreatedAt':
          [propertyA, propertyB] = [
            a.createdAt.toISOString(),
            b.createdAt.toISOString(),
          ];
          break;
        case 'ExpiresAt':
          [propertyA, propertyB] = [
            a.expiresAt.toISOString(),
            b.expiresAt.toISOString(),
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
