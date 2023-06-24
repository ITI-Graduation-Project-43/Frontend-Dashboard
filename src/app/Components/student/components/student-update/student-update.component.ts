import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentService } from '../../../../services/student.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css'],
})
export class StudentUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.studentService.updateStudent(this.data);
  }
}
