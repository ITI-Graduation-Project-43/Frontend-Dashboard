import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructorRoutingModule } from './instructor-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InstructorDetailsComponent } from './instructor-details/instructor-details.component';
import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InstructorDeleteComponent } from './instructor-delete/instructor-delete.component';
import { InstructorAddComponent } from './instructor-add/instructor-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstructorUpdateComponent } from './instructor-update/instructor-update.component';


@NgModule({
  declarations: [InstructorListComponent, InstructorDetailsComponent, InstructorDeleteComponent, InstructorAddComponent, InstructorUpdateComponent],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class InstructorModule { }
