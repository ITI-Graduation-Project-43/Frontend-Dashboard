import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../models/student';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.scss'],
})
export class StudentUpdateComponent {
  form!: FormGroup;
  @Input() data!: Student;
  headerInfo: string = 'Update Student';
  constructor(private fb: FormBuilder, public studentService: StudentService) {}

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
    console.log(this.form.value);
    this.studentService.uploadImage(this.data.id);
    this.studentService.UpdateStudent(this.form.value, this.data.id);
    console.log('updated success');
  }

  handleFile(event: any) {
    this.studentService.selectedFile = event.target.files[0];
    this.studentService.uploadPlaceHolder =
      this.studentService.selectedFile.name;
  }
}
