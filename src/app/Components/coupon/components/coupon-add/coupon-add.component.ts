import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Coupon } from 'src/app/Models/coupon';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.scss'],
})
export class CouponAddComponent {
  form!: FormGroup;
  newCoupon!: Coupon;
  headerInfo: string = ' Add Coupon';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public couponService: CouponService,
    public dialogRef: MatDialogRef<CouponAddComponent>
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
      ],
      discount: ['', [Validators.required, Validators.max(99)]],
      expiresAt: ['', Validators.required],
    });
  }
  onSubmit(): void {
    this.loading = true;
    const discountValue = this.form.controls['discount'].value;
    const discountAsDecimal = discountValue / 100;
    this.newCoupon = this.form.value as Coupon;
    this.newCoupon.discount = discountAsDecimal;
    this.newCoupon.createdAt = new Date();
    console.log(this.newCoupon);
    this.couponService.AddCoupon(this.newCoupon).subscribe(() => {
      this.couponService.getAllCoupons().subscribe((data) => {
        this.couponService.setData(data);
        this.loading = false;
        this.dialogRef.close();
      });
    });
  }
}
