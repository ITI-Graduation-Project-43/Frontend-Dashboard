import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../Models/student';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.scss'],
})
export class StudentUpdateComponent {
  form!: FormGroup;
  headerInfo: string = 'Update Student';
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    public studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    public dialogRef: MatDialogRef<StudentUpdateComponent>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [this.data?.firstName, Validators.required],
      lastName: [this.data?.lastName, Validators.required],
      bio: [this.data?.bio, Validators.required],
      profilePicture: [this.data?.profilePicture, Validators.required],
      updatedAt: [new Date()],
    });
  }

  submit() {
    this.loading = true;
    console.log(this.form.value);
    this.studentService.uploadImage(this.data.id);
    this.studentService
      .UpdateStudent(this.form.value, this.data.id)
      .subscribe(() => {
        this.studentService.getAllStudents().subscribe((data) => {
          this.studentService.setData(data);
        });
      });
    this.studentService
      .UpdateStudent(this.form.value, this.data.id)
      .subscribe(() => {
        this.studentService.getAllStudents().subscribe((data) => {
          this.studentService.setData(data);
          this.loading = false;
          this.dialogRef.close();
        });
      });
  }

  handleFile(event: any) {
    this.studentService.selectedFile = event.target.files[0];
    this.studentService.uploadPlaceHolder =
      this.studentService.selectedFile.name;
  }
}
