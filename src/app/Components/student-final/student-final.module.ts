import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentFinalRoutingModule } from './student-final-routing.module';
import { StudentListComponent } from './Components/student-list/student-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { StudentAddComponent } from './Components/student-add/student-add.component';
import { StudentUpdateComponent } from './Components/student-update/student-update.component';
import { StudentDeleteComponent } from './Components/student-delete/student-delete.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { StudentDetailComponent } from './Components/student-detail/student-detail.component';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentAddComponent,
    StudentUpdateComponent,
    StudentDeleteComponent,
    StudentDetailComponent,
  ],
  imports: [
    CommonModule,
    StudentFinalRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    SharedModule,
    ReactiveFormsModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
  ],
})
export class StudentFinalModule {}
