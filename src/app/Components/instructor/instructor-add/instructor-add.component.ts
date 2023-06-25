import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InstructorService } from '../../../services/instructor.service';
import { Instructor } from 'src/app/Models/instructor';

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
    private dialogRef: MatDialogRef<InstructorAddComponent>
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
    console.log(this.newInstructor);
    this.instructorService.AddInstructor(this.newInstructor).subscribe(() => {
      this.instructorService.getAllInstructors().subscribe((data) => {
        this.instructorService.setData(data);
        this.loading = false;
        this.dialogRef.close();
      });
    });
  }
}
