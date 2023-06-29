import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Coupon } from '../Models/coupon';
import { APIService } from '../shared/Services/api.service';
import { APIResponseVM } from '../shared/ViewModels/apiresponse-vm';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private readonly API_URL = 'https://localhost:7129/api/SiteCoupon';
  dataChange: BehaviorSubject<Coupon[]> = new BehaviorSubject<Coupon[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  data: Coupon[] = [];
  setData(data: any) {
    this.dataChange.next(data);
  }

  getData() {
    return this.dataChange.asObservable();
  }
  constructor(private httpClient: HttpClient, private apiService: APIService) {}

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */

  getAllCoupons(): Observable<Coupon[]> {
    return this.httpClient.get<Coupon[]>(this.API_URL).pipe(
      map((data: Coupon[]) => {
        this.data = data;
        this.dataChange.next(data);
        return data;
      })
    );
  }

  deleteCoupon(id: number): Observable<APIResponseVM> {
    return this.apiService.deleteItem(`SiteCoupon/${id}`);
  }

  UpdateCoupon(coupon: Coupon): Observable<Coupon> {
    return this.httpClient.put<Coupon>(this.API_URL, coupon);
  }

  AddCoupon(coupon: Coupon): Observable<Coupon[]> {
    return this.apiService
      .addItem(`SiteCoupon`, coupon)
      .pipe(map((data: APIResponseVM) => data.items as Coupon[]));
  }
}
