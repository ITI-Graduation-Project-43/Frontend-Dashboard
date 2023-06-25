import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorService } from '../../../services/instructor.service';
import { Instructor } from '../../../models/instructor';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-instructor-update',
  templateUrl: './instructor-update.component.html',
  styleUrls: ['./instructor-update.component.scss'],
})
export class InstructorUpdateComponent {
  form!: FormGroup;
  @Input() instructor!: Instructor;
  loading: boolean = false;
  headerInfo: string = 'Update Instructor';

  constructor(
    private fb: FormBuilder,
    public instructorService: InstructorService,
    private dialogRef: MatDialogRef<InstructorUpdateComponent>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [this.instructor.firstName, Validators.required],
      lastName: [this.instructor.lastName, Validators.required],
      bio: [this.instructor.bio, Validators.required],
      profilePicture: [this.instructor.profilePicture, Validators.required],
      title: [this.instructor.title, Validators.required],
      description: [this.instructor.description, Validators.required],
      updatedAt: [new Date()],
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.loading = true;
    console.log(this.form.value);
    this.instructorService.uploadImage(this.instructor.id);
    this.instructorService
      .UpdateInstructor(this.form.value, this.instructor.id)
      .subscribe((data: []) => {
        this.instructorService
          .getAllInstructors()
          .subscribe((data: Instructor[]) => {
            this.instructorService.setData(data);
          });
      });
    console.log('updated success');
    this.instructorService
      .UpdateInstructor(this.form.value, this.instructor.id)
      .subscribe((data: []) => {
        this.instructorService
          .getAllInstructors()
          .subscribe((data: Instructor[]) => {
            this.instructorService.setData(data);
            this.loading = false;
            this.dialogRef.close();
          });
      });
    console.log('updated success');
  }

  handleFile(event: any) {
    this.instructorService.selectedFile = event.target.files[0];
    this.instructorService.uploadPlaceHolder =
      this.instructorService.selectedFile.name;
  }
}
