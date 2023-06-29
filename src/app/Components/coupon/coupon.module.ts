import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponComponent } from './coupon.component';
import { CouponRoutingModule } from './coupon-routing.module';
import { CouponAddComponent } from './components/coupon-add/coupon-add.component';
import { CouponDeleteComponent } from './components/coupon-delete/coupon-delete.component';
import { CouponUpdateComponent } from './components/coupon-update/coupon-update.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    CouponComponent,
    CouponAddComponent,
    CouponDeleteComponent,
    CouponUpdateComponent,
  ],
  imports: [
    CommonModule,
    CouponRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    HttpClientModule,
    SharedModule,
    MatNativeDateModule,
  ],
})
export class CouponModule {}
