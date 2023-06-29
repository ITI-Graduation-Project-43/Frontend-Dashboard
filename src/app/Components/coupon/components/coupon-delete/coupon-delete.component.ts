import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-coupon-delete',
  templateUrl: './coupon-delete.component.html',
  styleUrls: ['./coupon-delete.component.scss'],
})
export class CouponDeleteComponent {
  headerInfo: string = 'Delete Coupon';
  loading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<CouponDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public couponService: CouponService
  ) {}
  delete(): void {
    this.loading = true;
    this.couponService.deleteCoupon(this.data.id).subscribe((data) => {
      this.couponService.getAllCoupons().subscribe((data) => {
        this.couponService.setData(data);
        this.loading = false;
        this.dialogRef.close();
      });
    });
  }
  cancel() {
    this.dialogRef.close();
  }
}
