import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { FormControl, Validators } from '@angular/forms';
import { Student } from '../../../../models/student';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'],
})
export class StudentAddComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    public studentService: StudentService
  ) {}

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  submit() {
    // empty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.studentService.AddStudent(this.data);
  }
}
