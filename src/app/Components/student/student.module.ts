import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { StudentService } from '../../services/student.service';
import { FormsModule } from '@angular/forms';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentUpdateComponent } from './components/student-update/student-update.component';
import { StudentDeleteComponent } from './components/student-delete/student-delete.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    StudentComponent,
    StudentAddComponent,
    StudentUpdateComponent,
    StudentDeleteComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [StudentService],
})
export class StudentModule {}
