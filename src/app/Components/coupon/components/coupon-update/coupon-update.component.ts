import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Coupon } from 'src/app/Models/coupon';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-coupon-update',
  templateUrl: './coupon-update.component.html',
  styleUrls: ['./coupon-update.component.scss'],
})
export class CouponUpdateComponent {
  form!: FormGroup;
  headerInfo: string = 'Update Coupon';
  updatedCoupon!: Coupon;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    public couponService: CouponService,
    @Inject(MAT_DIALOG_DATA) public data: Coupon,
    public dialogRef: MatDialogRef<CouponUpdateComponent>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [this.data?.id],
      code: [this.data?.code, Validators.required],
      discount: [this.data?.discount * 100, Validators.required],
      expiresAt: [this.data?.expiresAt, Validators.required],
      updatedAt: [new Date()],
    });
  }

  submit() {
    this.loading = true;
    const discountValue = this.form.controls['discount'].value;
    const discountAsDecimal = discountValue / 100;
    this.updatedCoupon = this.form.value as Coupon;
    this.updatedCoupon.discount = discountAsDecimal;
    console.log(this.form.value);
    this.couponService.UpdateCoupon(this.updatedCoupon).subscribe(() => {
      this.couponService.getAllCoupons().subscribe((data) => {
        this.couponService.setData(data);
      });
    });
    this.couponService.UpdateCoupon(this.updatedCoupon).subscribe(() => {
      this.couponService.getAllCoupons().subscribe((data) => {
        this.couponService.setData(data);
        this.loading = false;
        this.dialogRef.close();
      });
    });
  }
}
