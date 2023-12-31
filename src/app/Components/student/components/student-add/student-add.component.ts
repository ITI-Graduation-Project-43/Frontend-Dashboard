import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../Models/student';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.scss'],
})
export class StudentAddComponent {
  form!: FormGroup;
  newStudent!: Student;
  headerInfo: string = 'Add Student';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public studentService: StudentService,
    public dialogRef: MatDialogRef<StudentAddComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.newStudent = this.form.value as Student;
    this.studentService.AddStudent(this.newStudent).subscribe(() => {
      this.studentService.getAllStudents(1, 5).subscribe((data) => {
        this.studentService.setData(data);
        this.loading = false;
        this.dialogRef.close();
      });
    });
  }
}
