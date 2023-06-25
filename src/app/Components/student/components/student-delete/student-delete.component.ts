import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css'],
})
export class StudentDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentService: StudentService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.studentService.deleteItem(this.data.id);
  }
}
