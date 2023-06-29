import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InstructorService } from '../../../services/instructor.service';
import { Instructor } from 'src/app/Models/instructor';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-instructor-add',
  templateUrl: './instructor-add.component.html',
  styleUrls: ['./instructor-add.component.scss'],
})
export class InstructorAddComponent implements OnInit {
  form!: FormGroup;
  newInstructor!: Instructor;
  heaerInfo: string = 'Add Instructor';
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private instructorService: InstructorService,
    private dialogRef: MatDialogRef<InstructorAddComponent>,
    private snackBar: MatSnackBar
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
    this.newInstructor = this.form.value as Instructor;
    this.instructorService.AddInstructor(this.newInstructor).subscribe(() => {
      this.instructorService.getAllInstructors().subscribe((data) => {
        this.instructorService.setData(data);
        this.loading = false;
        this.dialogRef.close();
        this.snackBar.open('Instructor added successfully!', 'ok', {
          duration: 3000
        });
      });
    },(error)=>{
      this.snackBar.open('Try another e-mail!', 'ok', {
        duration: 3000
      });
      this.dialogRef.close();
    });
  }
}
