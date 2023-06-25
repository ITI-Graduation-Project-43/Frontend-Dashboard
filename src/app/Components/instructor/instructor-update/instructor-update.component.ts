import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Instructor } from 'src/app/Models/instructor';
import { InstructorService } from 'src/app/Services/instructor.service';
import { APIResponseVM } from 'src/app/shared/ViewModels/apiresponse-vm';

@Component({
  selector: 'app-instructor-update',
  templateUrl: './instructor-update.component.html',
  styleUrls: ['./instructor-update.component.sass']
})
export class InstructorUpdateComponent {
  form!: FormGroup;
  @Input() instructor!:Instructor;

  constructor(private fb: FormBuilder, private instructorService:InstructorService) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [this.instructor.firstName, Validators.required],
      lastName: [this.instructor.lastName, Validators.required],
      bio: [this.instructor.bio, Validators.required],
      profilePicture: [this.instructor.profilePicture, Validators.required],
      title: [this.instructor.title, Validators.required],
      description: [this.instructor.description, Validators.required],
      updatedAt: [new Date()]
    });
  }

  onSubmit() {
    console.log(this.form.value)
    this.instructorService.UpdateInstructor(this.form.value, this.instructor.id).subscribe((data:[])=>{
      this.instructorService.getAllInstructors().subscribe((data:Instructor[])=>{
        this.instructorService.setData(data);
      })
    })
    console.log("updated success");
  }
}
