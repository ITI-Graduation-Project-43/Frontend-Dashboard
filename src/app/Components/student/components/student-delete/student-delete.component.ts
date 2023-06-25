import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.scss'],
})
export class StudentDeleteComponent {
  headerInfo: string = 'Delete Student';
  constructor(
    public dialogRef: MatDialogRef<StudentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public studentService: StudentService
  ) {}

  delete(): void {
    this.studentService.deleteItem(this.data.id);
  }
  cancel() {
    this.dialogRef.close();
  }
}
